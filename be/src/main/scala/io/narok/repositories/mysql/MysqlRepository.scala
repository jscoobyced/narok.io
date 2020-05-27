package io.narok.repositories.mysql

import java.sql.{Connection, PreparedStatement, ResultSet, Statement}
import java.time.ZoneId
import java.util.Date

import com.google.inject.Inject
import io.narok.repositories.{DatabaseRepository, SqlConnectionCreator}

import scala.annotation.tailrec
import scala.util.Try

class MysqlRepository @Inject()(private val sqlConnectionCreator: SqlConnectionCreator) extends DatabaseRepository {

  override def executeQuery[T](
      sql: String,
      parameters: Option[List[(Int, Any)]],
      mapper: ResultSet => List[T]
  ): List[T] = {
    var results = List[T]()
    prepareStatement(sql, parameters).get match {
      case preparedStatement: PreparedStatement =>
        Try(preparedStatement.executeQuery()).get match {
          case resultSet: ResultSet =>
            results = mapper(resultSet)
            resultSet.close()
          case _ =>
        }
      case _ =>
    }
    results
  }

  override def executeSingleUpdate(sql: String, parameters: Option[List[(Int, Any)]]): Int = {
    var insertedKey = -1
    prepareStatement(sql, parameters, withKey = true).get match {
      case preparedStatement: PreparedStatement =>
        Try(preparedStatement.executeUpdate()).get match {
          case 1 =>
            Try(preparedStatement.getGeneratedKeys).get match {
              case resultSet =>
                if (resultSet.next()) {
                  insertedKey = resultSet.getInt(1)
                  resultSet.close()
                }
              case _ =>
            }
          case _ =>
        }
      case _ =>
    }
    insertedKey
  }

  override def executeUpdate(sql: String, parameters: Option[List[List[(Int, Any)]]]): Int = {
    var insertedRows = 0
    @tailrec
    def reindexParameters(remaining: List[List[(Int, Any)]],
                          container: List[(Int, Any)],
                          counter: Int = 0): List[(Int, Any)] =
      if (remaining.isEmpty) container
      else
        reindexParameters(remaining.tail,
                          container ++ remaining.head.map(e => (e._1 + counter, e._2)),
                          counter + remaining.head.length)
    val reindexedParameters = Some(reindexParameters(parameters.getOrElse(List()), List()))
    prepareStatement(sql, reindexedParameters).get match {
      case preparedStatement: PreparedStatement =>
        Try(preparedStatement.executeUpdate()).get match {
          case 1 => insertedRows = insertedRows + 1
          case _ =>
        }
      case _ =>
    }
    insertedRows
  }

  private def prepareStatement(sql: String,
                               parameters: Option[List[(Int, Any)]],
                               withKey: Boolean = false): Option[PreparedStatement] = {
    val key = if (withKey) Statement.RETURN_GENERATED_KEYS else Statement.NO_GENERATED_KEYS
    sqlConnectionCreator.getConnection.get match {
      case connection: Connection =>
        Some(connection.prepareStatement(sql, key)).get match {
          case statement: PreparedStatement =>
            Try(bindParameters(statement, parameters)).get match {
              case preparedStatement: PreparedStatement => Some(preparedStatement)
              case _                                    => None
            }
          case _ => None
        }
      case _ => None
    }
  }

  private def bindParameters(statement: PreparedStatement, parameters: Option[List[(Int, Any)]]): PreparedStatement = {
    if (parameters.getOrElse(List()).nonEmpty)
      parameters.get
        .foreach {
          case (index: Int, value: Int)    => statement.setInt(index, value)
          case (index: Int, value: Long)   => statement.setLong(index, value)
          case (index: Int, value: Double) => statement.setDouble(index, value)
          case (index: Int, value: String) => statement.setString(index, value)
          case (index: Int, value: Date) =>
            statement.setObject(index, value.toInstant.atZone(ZoneId.of("UTC")).toLocalDateTime)
          case _ =>
        }
    statement
  }

}
