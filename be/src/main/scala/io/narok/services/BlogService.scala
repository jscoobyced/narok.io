package io.narok.services

import java.util.Date

import com.google.inject.Inject
import io.narok.models.blog.Article
import io.narok.repositories.DatabaseRepository
import io.narok.repositories.mappers.{ArticleMapper, BlogContentMapper}
import io.narok.routes.JsonSupport

import scala.concurrent.ExecutionContext

trait BlogService {
  def getArticles: List[Article]
}

class Database @Inject()(databaseRepository: DatabaseRepository) {
  private val getArticlesSql: String = "SELECT id, title, created, modified FROM blog " +
    "ORDER BY created DESC, modified DESC LIMIT 5"
  private val getArticleContentSql: String = "SELECT id, content, type, blog_id, alttext, align FROM blog_content" +
    " WHERE blog_id = ?"
  private val insertArticleSql              = "INSERT INTO blog (title, created, modified) VALUES (?, ?, ?)"
  private val insertArticleContentSql       = "INSERT INTO blog_content (content, type, blog_id, alttext, align) VALUES "
  private val insertArticleContentValuesSql = "(?, ?, ?, ?, ?),"

  def articles(): List[Article] =
    databaseRepository
      .executeQuery(getArticlesSql, None, ArticleMapper.toArticle)
      .map(blog => {
        var article: Article = blog
        databaseRepository
          .executeQuery(getArticleContentSql, Some(List((1, blog.id))), BlogContentMapper.toBlogContent)
          .foreach(content => {
            article = article.addContent(content)
          })
        article
      })

  def saveArticle(article: Article): Boolean =
    databaseRepository
      .executeSingleUpdate(insertArticleSql, Some(List((1, article.title), (2, new Date()), (3, new Date())))) match {
      case 0 => false
      case id: Int =>
        if (article.contents.isEmpty) id > 0
        else {
          val values: List[List[(Int, Any)]] = article.contents.map(content => {
            List(
              (1, content.value),
              (2, content.contentType match {
                case "text"  => 0
                case "image" => 1
                case _       => 0
              }),
              (3, id),
              (4, content.altText.getOrElse("")),
              (5, content.align.get match {
                case "left"   => 0
                case "center" => 1
                case "right"  => 2
                case _        => 0
              })
            )
          })
          val subSql  = insertArticleContentValuesSql * article.contents.length
          val fullSql = insertArticleContentSql + subSql.dropRight(1)
          databaseRepository.executeUpdate(fullSql, Some(values)) == 1
        }
    }
}

class BlogServiceImpl @Inject()(private val databaseRepository: DatabaseRepository)(
    implicit private val executionContext: ExecutionContext)
    extends BlogService
    with JsonSupport {
  override def getArticles: List[Article] = new Database(databaseRepository).articles()

  def saveArticle(article: Article): Boolean = new Database(databaseRepository).saveArticle(article)
}
