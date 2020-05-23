package io.nariok.repositories.mappers

import java.sql.ResultSet

import io.nariok.models.blog.Article

object ArticleMapper extends AbstractMapper {

  def toArticle(resultSet: ResultSet): List[Article] = {
    val articleIterator = resultSetIterator(resultSet)
    val articles = articleIterator.map(result => {
      Article(
        result.getInt(1),
        result.getString(2),
        List(),
        result.getDate(3).toString,
        result.getDate(4).toString
      )
    })
    articles.toList
  }

}
