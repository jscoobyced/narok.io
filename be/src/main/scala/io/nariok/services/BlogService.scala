package io.nariok.services

import com.google.inject.Inject
import io.nariok.models.blog.Article
import io.nariok.repositories.MysqlRepository
import io.nariok.routes.JsonSupport

import scala.concurrent.ExecutionContext

object Database {
  val database = new MysqlRepository
  database.connect()
  val articlesSql = "SELECT id, title, created, modified FROM blog " +
    "ORDER BY created DESC, modified DESC LIMIT 5"
  val blogs      = database.executeQuery(articlesSql, None, MysqlRepository.toArticle)
  val contentSql = "SELECT id, content, type, blog_id, alttext, align FROM blog_content"
  val contents   = database.executeQuery(contentSql, None, MysqlRepository.toBlogContent)

  def articles(): List[Article] =
    blogs.map(blog => {
      var article: Article = blog
      contents
        .filter(_.blogId == blog.id)
        .foreach(content => {
          article = article.addContent(content)
        })
      article
    })
  database.disconnect()
}

class BlogServiceImpl @Inject()()(implicit private val executionContext: ExecutionContext)
    extends BlogService
    with JsonSupport {
  override def getArticles(): List[Article] = Database.articles()
}

trait BlogService {
  def getArticles(): List[Article]
}
