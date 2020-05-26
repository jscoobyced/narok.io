package io.narok.repositories.mappers

import java.sql.ResultSet

import io.narok.models.blog.BlogContent

import scala.util.Try

object BlogContentMapper extends AbstractMapper {
  def toBlogContent(resultSet: ResultSet): List[BlogContent] = {
    val contentIterator = resultSetIterator(resultSet)
    val contents = Try(
      contentIterator.map(result => {
        BlogContent(
          result.getInt(1),
          result.getString(2),
          result.getInt(3) match {
            case 0 => "text"
            case 1 => "image"
            case _ => "text"
          },
          result.getInt(4),
          Some(result.getString(5)),
          result.getInt(6) match {
            case 0 => Some("left")
            case 1 => Some("center")
            case 2 => Some("right")
            case _ => Some("left")
          }
        )
      })
    )
    contents.getOrElse(List[BlogContent]()).toList
  }

}
