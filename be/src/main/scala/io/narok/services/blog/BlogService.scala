package io.narok.services.blog

import com.google.inject.Inject
import io.narok.models.blog.Article
import io.narok.repositories.db.DatabaseRepository
import io.narok.routes.JsonSupport

import scala.concurrent.ExecutionContext

trait BlogService {
  def getArticles: List[Article]
  def saveArticle(article: Article): Int
  def updateArticle(id: Int, article: Article): Boolean
}

class BlogServiceImpl @Inject()(
    private val databaseRepository: DatabaseRepository,
    private val googleService: GoogleService)(implicit private val executionContext: ExecutionContext)
    extends BlogService
    with JsonSupport {
  val database = new BlogDatabase(databaseRepository)

  override def getArticles: List[Article] = database.articles()

  override def saveArticle(article: Article): Int = {
    val user = googleService.getUser(article.owner.token)
    if (user.id == article.owner.id) database.saveArticle(article)
    else 0
  }

  override def updateArticle(id: Int, article: Article): Boolean = {
    val user = googleService.getUser(article.owner.token)
    if (user.id == article.owner.id) database.updateArticle(id, article)
    else false
  }
}
