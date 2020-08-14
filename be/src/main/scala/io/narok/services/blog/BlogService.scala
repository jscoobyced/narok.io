package io.narok.services.blog

import com.google.inject.Inject
import io.narok.configuration.AuthConfiguration
import io.narok.models.blog.Article
import io.narok.repositories.db.DatabaseRepository
import io.narok.routes.JsonSupport
import io.narok.services.authentication.GoogleService
import io.narok.services.security.HtmlSanitizer

import scala.concurrent.ExecutionContext

trait BlogService {
  def getArticle(id: Int): Option[Article]
  def getArticles: List[Article]
  def saveArticle(article: Article, token: Option[String]): Int
  def updateArticle(id: Int, article: Article, token: Option[String]): Boolean
}

class BlogServiceImpl @Inject()(
    private val databaseRepository: DatabaseRepository,
    private val googleService: GoogleService,
    private val htmlSanitizer: HtmlSanitizer)(implicit private val executionContext: ExecutionContext)
    extends BlogService
    with JsonSupport {
  val database = new BlogDatabase(databaseRepository)

  override def getArticles: List[Article] = htmlSanitizer.sanitizeAllArticles(database.articles())

  override def getArticle(id: Int): Option[Article] = database.article(id) match {
    case Some(article) => Some(htmlSanitizer.sanitizeArticle(article))
    case _             => None
  }

  override def saveArticle(article: Article, token: Option[String]): Int = {
    val userId = googleService.getUserId(token)
    if (AuthConfiguration.getOwnerIds.contains(userId)) database.saveArticle(article)
    else -1
  }

  override def updateArticle(id: Int, article: Article, token: Option[String]): Boolean = {
    val userId = googleService.getUserId(token)
    if (AuthConfiguration.getOwnerIds.contains(userId)) database.updateArticle(id, article)
    else false
  }
}
