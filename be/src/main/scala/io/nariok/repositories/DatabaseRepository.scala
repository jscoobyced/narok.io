package io.nariok.repositories

import java.sql.ResultSet

trait DatabaseRepository {
  def executeQuery[T](sql: String, parameters: Option[Map[String, Any]], mapper: ResultSet => List[T]): List[T]
}
