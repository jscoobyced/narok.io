package io.narok.repositories

import java.sql.ResultSet

import io.narok.repositories.db.{DatabaseRepository, Parameter}

class DatabaseRepositoryMock(private val articles: Iterator[List[Any]] = Iterator(List()),
                             private val single: Int = 1,
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
    if (articles.isEmpty) None
    else {
      val nextValue = articles.next()
      if (nextValue.isEmpty) None
      else Some(nextValue.head.asInstanceOf[T])
    }

  override def executeSingleUpdate(sql: String, parameters: Option[List[Parameter]]): Int = single

  override def executeUpdate(sql: String, parameters: Option[List[List[Parameter]]]): Int = updated.next
}
