package io.narok.services

import io.narok.BaseTest
import io.narok.models.blog.{Article, BlogContent}
import io.narok.models.User
import io.narok.repositories.DatabaseRepositoryMock
import io.narok.services.blog.BlogServiceImpl
import io.narok.services.security.HtmlSanitizerImpl

class BlogServiceSpec extends BaseTest {

  describe("A BlogService") {
    val blogContent1 = BlogContent(1, "test", "text", 1, 0, Some(""), Some("left"))
    val blogContent2 = BlogContent(1, "test", "image", 1, 0, Some(""), Some("center"))
    val blogContent3 = BlogContent(1, "test", "undefined", 1, 0, Some(""), Some("right"))
    val blogContent4 = BlogContent(1, "test", "undefined", 1, 0, Some(""), Some(""))
    val blogContent5 = BlogContent(1, "test", "undefined", 1, 0, Some(""))
    val expectedArticle =
      Article(1,
              User("0", "Admin", "token"),
              "test",
              List(blogContent1, blogContent2, blogContent3, blogContent4, blogContent5),
              "now",
              "now",
              0)
    val articles = List(expectedArticle)
    it("should be able to get Article list") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(articles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.getArticles.nonEmpty)
    }

    it("should be able to get an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(articles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.getArticle(articles.head.id).isDefined)
    }

    it("should be able to save an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(articles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(expectedArticle) == expectedArticle.id)
    }

    it("should not allow to save an Article from wrong owner") {
      val differentOwnerArticles = List(Article(1, User("1", "Admin", "token"), "test", List(), "now", "now", 0))
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(differentOwnerArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(differentOwnerArticles.head) == -1)
    }
    it("should be able to detect an Article cannot be saved") {
      val emptyContentArticle = Article(1, User("0", "Admin", "token"), "test", List(), "now", "now", 0)
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(List(), List()),
                                     single = 0,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(emptyContentArticle) == 0)
    }

    it("should be able to save an Article with no content") {
      val emptyContentArticle = Article(1, User("0", "Admin", "token"), "test", List(), "now", "now", 0)
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(List(emptyContentArticle), List()),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(emptyContentArticle) == emptyContentArticle.id)
    }

    it("should be able to update an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(
            articles = Iterator(articles, expectedArticle.contents),
            single = expectedArticle.id,
            updated = Iterator(1, expectedArticle.contents.length, expectedArticle.contents.length)
          ),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.updateArticle(expectedArticle.id, expectedArticle))
    }

    it("should not allow to update an Article from another owner") {
      val differentOwnerArticles = List(Article(1, User("1", "Admin", "token"), "test", List(), "now", "now", 0))
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(differentOwnerArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(0, 1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(differentOwnerArticles.head.id, differentOwnerArticles.head))
    }

    it("should detect a failure to update an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(articles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(0, 1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(expectedArticle.id, expectedArticle))
    }

    it("should detect a failure to delete an Article content") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(articles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, -1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(expectedArticle.id, expectedArticle))
    }
    it("should detect a failure to update an Article content") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(articles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, 1, 0)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(expectedArticle.id, expectedArticle))
    }
  }
}
