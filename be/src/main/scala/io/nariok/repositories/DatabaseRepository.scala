package io.nariok.repositories

import java.sql.ResultSet

trait DatabaseRepository {

  def connect(): Unit

  def disconnect(): Unit

  def executeQuery[T](sql: String, parameters: Option[Map[String, Any]], mapper: ResultSet => List[T]): List[T]
}
