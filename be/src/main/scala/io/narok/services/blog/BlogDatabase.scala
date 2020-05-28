package io.narok.services.blog

import java.util.Date

import com.google.inject.Inject
import io.narok.models.blog.Article
import io.narok.repositories.DatabaseRepository
import io.narok.repositories.mappers.{ArticleMapper, BlogContentMapper}

class BlogDatabase @Inject()(databaseRepository: DatabaseRepository) {
  private val getArticlesSql: String = "SELECT id, title, created, modified FROM blog " +
    "WHERE status = 0 ORDER BY created DESC, modified DESC LIMIT 5"
  private val getArticleContentSql: String = "SELECT id, content, type, blog_id, alttext, align FROM blog_content" +
    " WHERE status = 0 AND blog_id = ?"
  private val insertArticleSql = "INSERT INTO blog (title, created, modified, status) VALUES (?, ?, ?, 0)"
  private val insertArticleContentSql =
    "INSERT INTO blog_content (content, type, blog_id, alttext, align, status) VALUES "
  private val insertArticleContentValuesSql = "(?, ?, ?, ?, ?, 0),"
  private val deleteArticleContentSql       = "UPDATE blog_content SET status = 1 WHERE blog_id = ?"
  private val updateArticleSql              = "UPDATE blog SET title = ?, modified = ? WHERE blog_id = ?"

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

  def saveArticle(article: Article): Int =
    databaseRepository
      .executeSingleUpdate(insertArticleSql, Some(List((1, article.title), (2, new Date()), (3, new Date())))) match {
      case 0 => 0
      case id: Int =>
        if (article.contents.isEmpty) id
        else {
          insertArticleContent(id, article)
          id
        }
    }

  def updateArticle(id: Int, article: Article): Boolean =
    databaseRepository.executeUpdate(updateArticleSql, Some(List(List((1, article.title), (2, new Date()), (3, id))))) match {
      case 1 =>
        databaseRepository.executeUpdate(deleteArticleContentSql, Some(List(List((1, id))))) match {
          // case number: Int if number >= 0 => insertArticleContent(id, article) == article.contents.length
          case number: Int =>
            println(number)
            insertArticleContent(id, article) == article.contents.length
          // case _ => false
        }
      case _ => false
    }

  private def insertArticleContent(id: Int, article: Article): Int = {
    val subSql  = insertArticleContentValuesSql * article.contents.length
    val fullSql = insertArticleContentSql + subSql.dropRight(1)
    databaseRepository.executeUpdate(fullSql, Some(mapValues(id, article)))
  }

  private def mapValues(id: Int, article: Article): List[List[(Int, Any)]] =
    article.contents.map(
      content =>
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
      ))
}
