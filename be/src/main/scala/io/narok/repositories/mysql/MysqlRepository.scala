package io.narok.repositories.mysql

import java.sql.{Connection, PreparedStatement, ResultSet}

import com.google.inject.Inject
import io.narok.repositories.{DatabaseRepository, SqlConnectionCreator}

import scala.util.Try

class MysqlRepository @Inject()(private val sqlConnectionCreator: SqlConnectionCreator) extends DatabaseRepository {

  override def executeQuery[T](
      sql: String,
      parameters: Option[List[(Int, Any)]],
      mapper: ResultSet => List[T]
  ): List[T] = {
    var results = List[T]()
    sqlConnectionCreator.getConnection.get match {
      case connection: Connection =>
        Some(connection.prepareStatement(sql)).get match {
          case statement: PreparedStatement =>
            Try(bindParameters(statement, parameters).executeQuery()).get match {
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

  override def executeSingleUpdate(sql: String, parameters: Option[List[(Int, Any)]]): Int = ???
  // https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-usagenotes-last-insert-id.html

  override def executeUpdate(sql: String, parameters: Option[List[List[(Int, Any)]]]): Int = ???

  private def bindParameters(statement: PreparedStatement, parameters: Option[List[(Int, Any)]]): PreparedStatement = {
    if (parameters.getOrElse(List()).nonEmpty)
      parameters.get
        .foreach {
          case (index: Int, value: Int)    => statement.setInt(index, value)
          case (index: Int, value: Long)   => statement.setLong(index, value)
          case (index: Int, value: Double) => statement.setDouble(index, value)
          case (index: Int, value: String) => statement.setString(index, value)
          case (index: Int, value)         =>
        }
    statement
  }

}
