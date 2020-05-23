package io.nariok.services

import com.google.inject.Inject
import io.nariok.models.blog.Article
import io.nariok.repositories.DatabaseRepository
import io.nariok.repositories.mappers.{ArticleMapper, BlogContentMapper}
import io.nariok.routes.JsonSupport

import scala.concurrent.ExecutionContext

trait BlogService {
  def getArticles(): List[Article]
}

class Database @Inject()(database: DatabaseRepository) {
  val articlesSql = "SELECT id, title, created, modified FROM blog " +
    "ORDER BY created DESC, modified DESC LIMIT 5"
  val blogs      = database.executeQuery(articlesSql, None, ArticleMapper.toArticle)
  val contentSql = "SELECT id, content, type, blog_id, alttext, align FROM blog_content"
  val contents   = database.executeQuery(contentSql, None, BlogContentMapper.toBlogContent)

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
}

class BlogServiceImpl @Inject()(private val databaseRepository: DatabaseRepository)(
    implicit private val executionContext: ExecutionContext)
    extends BlogService
    with JsonSupport {
  override def getArticles(): List[Article] = new Database(databaseRepository).articles()
}
