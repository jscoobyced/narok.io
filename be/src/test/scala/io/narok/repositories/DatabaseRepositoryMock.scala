package io.narok.repositories

import java.sql.ResultSet

import io.narok.repositories.db.{DatabaseRepository, Parameter}

class DatabaseRepositoryMock(private val articles: Iterator[List[Any]] = Iterator(List()),
                             private val single: Any = 1,
                             private val updated: Iterator[Int] = Iterator(1))
    extends DatabaseRepository {

  override def executeQuery[T](sql: String,
                               parameters: Option[List[Parameter]],
                               mapper: ResultSet => List[T]): List[T] =
    if (articles.isEmpty) List()
    else {
      val nextArticles = articles.next
      if (nextArticles.isEmpty) List()
      else nextArticles.map(a => a.asInstanceOf[T])
    }

  override def executeSingleQuery[T](sql: String,
                                     parameters: Option[List[Parameter]],
                                     mapper: ResultSet => Option[T]): Option[T] =
    Some(single.asInstanceOf[T])

  override def executeSingleUpdate(sql: String, parameters: Option[List[Parameter]]): Int = single.asInstanceOf[Int]

  override def executeUpdate(sql: String, parameters: Option[List[List[Parameter]]]): Int = updated.next
}
