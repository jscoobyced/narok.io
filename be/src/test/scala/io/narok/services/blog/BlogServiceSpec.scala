package io.narok.services.blog

import io.narok.BaseTest
import io.narok.models.User
import io.narok.models.blog.Article
import io.narok.repositories.DatabaseRepositoryMock
import io.narok.services.authentication.GoogleServiceMock
import io.narok.services.security.HtmlSanitizerImpl

class BlogServiceSpec extends BaseTest {

  describe("A BlogService") {
    val expectedArticle  = article()
    val expectedArticles = articles()

    it("should be able to get Article list") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(expectedArticles, expectedArticle.contents),
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
          new DatabaseRepositoryMock(articles = Iterator(expectedArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.getArticle(expectedArticles.head.id).isDefined)
    }

    it("should get None Article if not found") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(List(), expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.getArticle(5).isEmpty)
    }

    it("should be able to save an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(expectedArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(expectedArticle, Some("0")) == expectedArticle.id)
    }

    it("should be able to detect an Article cannot be saved") {
      val emptyContentArticle = Article(1, User("0", "Admin"), "test", List(), "now", "now", 0)
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(List(), List()),
                                     single = 0,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(emptyContentArticle, Some("0")) == 0)
    }

    it("should be able to save an Article with no content") {
      val emptyContentArticle = Article(1, User("0", "Admin"), "test", List(), "now", "now", 0)
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(List(emptyContentArticle), List()),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, expectedArticle.contents.length)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(emptyContentArticle, Some("0")) == emptyContentArticle.id)
    }

    it("should be able to update an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(
            articles = Iterator(expectedArticles, expectedArticle.contents),
            single = expectedArticle.id,
            updated = Iterator(1, expectedArticle.contents.length, expectedArticle.contents.length)
          ),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.updateArticle(expectedArticle.id, expectedArticle, Some("0")))
    }

    it("should not allow to update an Article from another owner") {
      val differentOwnerArticles = List(Article(1, User("1", "Admin"), "test", List(), "now", "now", 0))
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(differentOwnerArticles, expectedArticle.contents),
            single = expectedArticle.id,
            updated = Iterator(1, 1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(differentOwnerArticles.head.id, differentOwnerArticles.head, Some("1")))
    }

    it("should not allow to save an Article from another owner") {
      val differentOwnerArticles = List(Article(1, User("1", "Admin"), "test", List(), "now", "now", 0))
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(differentOwnerArticles, expectedArticle.contents),
            single = expectedArticle.id,
            updated = Iterator(1, 1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(blogService.saveArticle(differentOwnerArticles.head, Some("1")) == -1)
    }

    it("should detect a failure to update an Article") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(expectedArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(0, 1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(expectedArticle.id, expectedArticle, Some("0")))
    }

    it("should detect a failure to delete an Article content") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(expectedArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, -1, 1)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(expectedArticle.id, expectedArticle, Some("0")))
    }
    it("should detect a failure to update an Article content") {
      val blogService =
        new BlogServiceImpl(
          new DatabaseRepositoryMock(articles = Iterator(expectedArticles, expectedArticle.contents),
                                     single = expectedArticle.id,
                                     updated = Iterator(1, 1, 0)),
          new GoogleServiceMock,
          new HtmlSanitizerImpl
        )
      assert(!blogService.updateArticle(expectedArticle.id, expectedArticle, Some("0")))
    }
  }
}
