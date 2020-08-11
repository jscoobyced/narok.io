package io.narok.services.security

import io.narok.BaseTest

class HtmlSanitizerSpec extends BaseTest {

  describe("HtmlSanitizer") {

    it("should not change valid HTML") {
      val sanitizer       = new HtmlSanitizerImpl
      val expectedArticle = article()
      val resultArticle   = sanitizer.sanitizeArticle(expectedArticle)
      assert(expectedArticle.title == resultArticle.title)
      assert(expectedArticle.contents.find(_.id == 1).get == resultArticle.contents.find(_.id == 1).get)
    }

    it("should fix dangerous HTML in title") {
      val sanitizer       = new HtmlSanitizerImpl
      val expectedTitle   = "<span>test</span>"
      val expectedArticle = article().copy(title = "<span onclick=\"alert(0);\">test</span>")
      val resultArticle   = sanitizer.sanitizeArticle(expectedArticle)
      assert(resultArticle.title == expectedTitle)
    }

    it("should allow all supported HTML") {
      val sanitizer = new HtmlSanitizerImpl
      val data = List(
        ("<a href=\"https://localhost\" alt=\"alternate\" target=\"_blank\" style=\"color: blue\">test</a>",
         "<a href=\"https://localhost\" alt=\"alternate\" target=\"_blank\" rel=\"noopener noreferrer\">test</a>"),
        ("<a href=\"http://localhost\" alt=\"alternate\" target=\"_blank\" style=\"color: blue\">test</a>",
         "<a alt=\"alternate\" target=\"_blank\">test</a>"),
        ("<i>test</i>", "<i>test</i>"),
        ("<ol><li>test</li></ol>", "<ol><li>test</li></ol>"),
        ("<ul><li>test</li></ul>", "<ul><li>test</li></ul>"),
        ("<ol><li style=\"color: blue\">test</li></ol>", "<ol><li style=\"color: blue\">test</li></ol>"),
        ("<br />", "<br />"),
        ("<br>", "<br />"),
        ("<img src=\"https://example.com/test.png\">", "<img src=\"https://example.com/test.png\" />"),
        ("<img src=\"https://example.com/test.png\" onMouseOver=\"alert(0);\">",
         "<img src=\"https://example.com/test.png\" />"),
        ("<strike>text</strike>", "<strike>text</strike>"),
      )
      data.foreach(row => {
        assert(sanitizer.sanitize(row._1) == row._2)
      })
    }
  }
}
