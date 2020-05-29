package io.narok.repositories.db

import java.sql.ResultSet

trait DatabaseRepository {

  /**
    * Retrieve multiple rows from the database
    * @param sql The SQL query which can contain parametrized values
    * @param parameters The optional parameters to be bound to the prepared statement
    * @param mapper  The mapper that will parse the result set
    * @tparam T  The type of the result
    * @return  The retrieved data
    */
  def executeQuery[T](sql: String, parameters: Option[List[Parameter]], mapper: ResultSet => List[T]): List[T]

  /**
    * Execute a single insert of data and returns the generated key. This will work only if there is an
    * auto increment or sequence key and only one row to be inserted
    * @param sql The insert SQL query
    * @param parameters The optional parameters to be bound to the prepared statement
    * @return  The generated key
    */
  def executeSingleUpdate(sql: String, parameters: Option[List[Parameter]]): Int

  /**
    * Execute an update or insert query with possibly multiple rows of values.
    * @param sql The insert SQL query
    * @param parameters The optional parameters to be bound to the prepared statement
    * @return  The number of affected rows
    */
  def executeUpdate(sql: String, parameters: Option[List[List[Parameter]]]): Int
}
