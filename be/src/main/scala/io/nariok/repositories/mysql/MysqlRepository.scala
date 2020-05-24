package io.nariok.repositories.mysql

import java.sql.{Connection, ResultSet, Statement}

import com.google.inject.Inject
import io.nariok.repositories.{DatabaseRepository, SqlConnectionCreator}

import scala.util.Try

class MysqlRepository @Inject()(private val sqlConnectionCreator: SqlConnectionCreator) extends DatabaseRepository {

  override def executeQuery[T](
      sql: String,
      parameters: Option[Map[String, Any]],
      mapper: ResultSet => List[T]
  ): List[T] = {
    var results = List[T]()
    sqlConnectionCreator.getConnection.get match {
      case connection: Connection =>
        Some(connection.createStatement).get match {
          case statement: Statement =>
            Try(statement.executeQuery(sql)).get match {
              case resultSet: ResultSet =>
                results = mapper(resultSet)
                resultSet.close()
              case _ =>
            }
          case _ =>
        }
      case _ => None
    }
    results
  }
}
