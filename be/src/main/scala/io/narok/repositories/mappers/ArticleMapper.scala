package io.narok.repositories.mappers

import java.sql.ResultSet

import io.narok.models.{EmptyUser, User}
import io.narok.models.blog.Article

// $COVERAGE-OFF$
object ArticleMapper extends AbstractMapper {

  def toArticles(resultSet: ResultSet): List[Article] = {
    val articleIterator = resultSetIterator(resultSet)
    val articles = articleIterator.map(result => {
      Article(
        result.getInt(1),
        User(
          result.getInt(6),
          result.getString(7),
          result.getString(8),
          result.getString(9)
        ),
        result.getString(2),
        List(),
        result.getDate(3).toString,
        result.getDate(4).toString,
        result.getInt(5)
      )
    })
    articles.toList
  }

  def toArticle(resultSet: ResultSet): Option[Article] =
    if (resultSet.next()) {
      Some(
        Article(
          resultSet.getInt(1),
          User(
            resultSet.getInt(6),
            resultSet.getString(7),
            resultSet.getString(8),
            resultSet.getString(9)
          ),
          resultSet.getString(2),
          List(),
          resultSet.getDate(3).toString,
          resultSet.getDate(4).toString,
          resultSet.getInt(5)
        ))
    } else None
}
// $COVERAGE-ON$
