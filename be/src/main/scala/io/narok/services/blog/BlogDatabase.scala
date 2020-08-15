package io.narok.services.blog

import java.util.Date

import com.google.inject.Inject
import io.narok.configuration.AuthConfiguration
import io.narok.models.User
import io.narok.models.blog.{Article, BlogContent}
import io.narok.repositories.db.{DatabaseRepository, Parameter}
import io.narok.repositories.mappers.{ArticleMapper, BlogContentMapper}

import scala.annotation.tailrec

class BlogDatabase @Inject()(databaseRepository: DatabaseRepository) {
  private val getArticlesSql: String = "SELECT b.id, b.title, b.created, b.modified, b.status, " +
    "u.id, u.name, u.email, u.reference_id " +
    "FROM blog b JOIN user u ON b.user_id = u.id " +
    "WHERE b.status = 0 AND u.status = 0 ORDER BY b.created DESC, b.modified DESC LIMIT 5"
  private val getArticleSql: String = "SELECT b.id, b.title, b.created, b.modified, b.status, " +
    "u.id, u.name, u.email, u.reference_id " +
    "FROM blog b JOIN user u ON b.user_id = u.id " +
    "WHERE b.status = 0 AND u.status = 0 AND b.id = ?"
  private val getArticleContentSql
    : String = "SELECT id, content, type, blog_id, alttext, align, status FROM blog_content" +
    " WHERE status = 0 AND blog_id = ?"
  private val insertArticleSql = "INSERT INTO blog (title, user_id, created, modified, status) " +
    "SELECT ?, u.id, ?, ?, 0 FROM user u WHERE u.reference_id = ?"
  private val insertArticleContentSql =
    "INSERT INTO blog_content (content, type, blog_id, alttext, align, status) VALUES "
  private val insertArticleContentValuesSql = "(?, ?, ?, ?, ?, 0),"
  private val deleteArticleContentSql       = "UPDATE blog_content SET status = 1 WHERE blog_id = ?"
  private val updateArticleSql              = "UPDATE blog SET title = ?, modified = ? WHERE id = ?"

  def articles(): List[Article] = {
    val articles: List[Article] = databaseRepository
      .executeQuery(getArticlesSql, None, ArticleMapper.toArticles)

    addBlogContent(articles, List())
  }

  def article(id: Int): Option[Article] =
    databaseRepository
      .executeSingleQuery[Article](getArticleSql, Some(List(Parameter(1, id))), ArticleMapper.toArticle) match {
      case Some(result: Article) => Some(addBlogContent(List(result), List()).head)
      case _                     => None
    }

  def saveArticle(article: Article): Int =
    databaseRepository
      .executeSingleUpdate(insertArticleSql,
                           Some(
                             List(Parameter(1, article.title),
                                  Parameter(2, new Date()),
                                  Parameter(3, new Date()),
                                  Parameter(4, article.owner.referenceId)))) match {
      case 0 => 0
      case id: Int =>
        if (article.contents.isEmpty) id
        else {
          insertArticleContent(id, article)
          id
        }
    }

  def updateArticle(id: Int, article: Article): Boolean =
    databaseRepository.executeUpdate(
      updateArticleSql,
      Some(List(List(Parameter(1, article.title), Parameter(2, new Date()), Parameter(3, id))))) match {
      case 1 =>
        databaseRepository.executeUpdate(deleteArticleContentSql, Some(List(List(Parameter(1, id))))) match {
          case number if number >= 0 =>
            insertArticleContent(id, article) == article.contents.length
          case something =>
            println(s"Cannot delete blog_content: $something")
            false
        }
      case number: Int =>
        println(s"Cannot update blog with id $id: $number")
        false
    }

  private def insertArticleContent(id: Int, article: Article): Int = {
    val subSql  = insertArticleContentValuesSql * article.contents.length
    val fullSql = insertArticleContentSql + subSql.dropRight(1)
    databaseRepository.executeUpdate(fullSql, Some(mapValues(id, article)))
  }

  @tailrec
  private def addBlogContent(originalArticles: List[Article], destinationArticles: List[Article]): List[Article] =
    if (originalArticles.isEmpty) destinationArticles
    else {
      val originalArticle = originalArticles.head
      val blogContents: List[BlogContent] = databaseRepository
        .executeQuery(getArticleContentSql,
                      Some(List(Parameter(1, originalArticle.id))),
                      BlogContentMapper.toBlogContent)
      val article = originalArticles.head.copy(contents = blogContents)
      addBlogContent(originalArticles.tail, article :: destinationArticles)
    }

  private def mapValues(id: Int, article: Article): List[List[Parameter]] =
    article.contents.map(
      content =>
        List(
          Parameter(1, content.value),
          Parameter(2, content.contentType match {
            case "text"  => 0
            case "image" => 1
            case _       => 0
          }),
          Parameter(3, id),
          Parameter(4, content.altText.getOrElse("")),
          Parameter(5, content.align match {
            case Some("left")    => 0
            case Some("center")  => 1
            case Some("right")   => 2
            case Some(_: String) => 0
            case None            => 0
          })
      ))
}
