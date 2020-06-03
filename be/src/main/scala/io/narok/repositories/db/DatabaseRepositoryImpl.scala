package io.narok.repositories.db

import java.sql.{Connection, PreparedStatement, ResultSet, SQLException, Statement}
import java.time.ZoneId
import java.util.Date

import com.google.inject.Inject

import scala.annotation.tailrec
import scala.util.{Failure, Success, Try}

case class DatabaseResources(preparedStatement: PreparedStatement, connection: Connection) {
  def close(): Try[Unit] = {
    Try(preparedStatement.close())
    Try(connection.close())
  }
}

class DatabaseRepositoryImpl @Inject()() extends DatabaseRepository {
  override def executeQuery[T](
      sql: String,
      parameters: Option[List[Parameter]],
      mapper: ResultSet => List[T]
  ): List[T] = {
    var results = List[T]()
    prepareStatement(sql, parameters) match {
      case Success(databaseResources) =>
        Try(databaseResources.preparedStatement.executeQuery()) match {
          case Success(resultSet: ResultSet) =>
            results = mapper(resultSet)
            resultSet.close()
          case Failure(_) =>
        }
        Try(databaseResources.close())
      case Failure(_) =>
    }
    results
  }

  override def executeSingleUpdate(sql: String, parameters: Option[List[Parameter]]): Int = {
    var insertedKey = -1
    prepareStatement(sql, parameters, withKey = true) match {
      case Success(databaseResources) =>
        Try(databaseResources.preparedStatement.executeUpdate()) match {
          case Success(1) =>
            Try(databaseResources.preparedStatement.getGeneratedKeys) match {
              case Success(resultSet: ResultSet) =>
                if (resultSet.next()) {
                  insertedKey = resultSet.getInt(1)
                  resultSet.close()
                }
              case Failure(_) =>
            }
          case Success(number: Int) => insertedKey = number
          case Failure(_)           =>
        }
        Try(databaseResources.close())
      case Failure(_) =>
    }
    insertedKey
  }

  override def executeUpdate(sql: String, parameters: Option[List[List[Parameter]]]): Int = {
    @tailrec
    def reindexParameters(remaining: List[List[Parameter]],
                          container: List[Parameter],
                          counter: Int = 0): List[Parameter] =
      if (remaining.isEmpty) container
      else
        reindexParameters(
          remaining.tail,
          container ++ remaining.head.map(parameters => Parameter(parameters.index + counter, parameters.value)),
          counter + remaining.head.length)
    val reindexedParameters = Some(reindexParameters(parameters.getOrElse(List()), List()))
    println(reindexedParameters)
    prepareStatement(sql, reindexedParameters) match {
      case Success(databaseResources) =>
        Try(databaseResources.preparedStatement.executeUpdate()) match {
          case Success(number) if number >= 0 =>
            Try(databaseResources.close())
            number
          case Success(something) =>
            Try(databaseResources.close())
            println(s"Something: $something")
            0
          case Failure(error: Throwable) =>
            println(s"Update data: ${error.getMessage}")
            Try(databaseResources.close())
            0
        }
      case Failure(error: Throwable) =>
        println(s"Prepare statement: ${error.getMessage}")
        0
    }
  }

  private def prepareStatement(sql: String,
                               parameters: Option[List[Parameter]],
                               withKey: Boolean = false): Try[DatabaseResources] = {
    val key = if (withKey) Statement.RETURN_GENERATED_KEYS else Statement.NO_GENERATED_KEYS
    ConnectionFactory.getConnection match {
      case Success(connection) =>
        val preparedStatement = connection.prepareStatement(sql, key)
        Try(bindParameters(preparedStatement, parameters))
        Try(DatabaseResources(preparedStatement, connection))
      case _ => throw new SQLException("No connection available.")
    }
  }

  private def bindParameters(preparedStatement: PreparedStatement,
                             parameters: Option[List[Parameter]]): PreparedStatement = {
    parameters match {
      case Some(parameters) =>
        parameters.foreach {
          case Parameter(index: Int, value: Int)    => preparedStatement.setInt(index, value)
          case Parameter(index: Int, value: Long)   => preparedStatement.setLong(index, value)
          case Parameter(index: Int, value: Double) => preparedStatement.setDouble(index, value)
          case Parameter(index: Int, value: String) => preparedStatement.setString(index, value)
          case Parameter(index: Int, value: Date) =>
            preparedStatement.setObject(index, value.toInstant.atZone(ZoneId.of("UTC")).toLocalDateTime)
          case _ =>
        }
      case _ =>
    }
    preparedStatement
  }
}
