package io.narok.models

import io.narok.BaseTest
import io.narok.models.blog.BlogContent

class ArticleSpec extends BaseTest {
  describe("An Article") {
    it("should support adding content") {
      val article            = blog.Article(0, "title", List(), "2020", "2020", 0)
      val articleWithContent = article.addContent(BlogContent(0, "content", "text", 0, 0))
      assert(articleWithContent.contents.length == 1)
    }
  }
}
