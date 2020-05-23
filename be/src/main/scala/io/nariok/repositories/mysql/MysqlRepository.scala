package io.nariok.repositories.mysql

import java.sql.{Connection, DriverManager, ResultSet, SQLException}

import com.google.inject.Inject
import com.typesafe.config.Config
import io.nariok.configuration.RawConfiguration
import io.nariok.repositories.DatabaseRepository

class MysqlRepository @Inject()(private val rawConfiguration: RawConfiguration) extends DatabaseRepository {
  val config: Config         = rawConfiguration.config
  val host: String           = config.getString("db.host")
  val port: Int              = config.getInt("db.port")
  val name: String           = config.getString("db.name")
  val url: String            = s"jdbc:mysql://$host:$port/$name"
  val driver: String         = "com.mysql.jdbc.Driver"
  val username: String       = config.getString("db.user")
  val password: String       = config.getString("db.password")
  var connection: Connection = _

  override def connect(): Unit =
    try {
      Class.forName(driver)
      connection = DriverManager.getConnection(url, username, password)
    } catch {
      case cnf: ClassNotFoundException => cnf.printStackTrace()
      case sql: SQLException           => sql.printStackTrace()
      case e: Exception                => e.printStackTrace()
    }

  override def disconnect(): Unit =
    try {
      connection.close()
    } catch {
      case sql: SQLException => sql.printStackTrace()
    }

  override def executeQuery[T](
      sql: String,
      parameters: Option[Map[String, Any]],
      mapper: ResultSet => List[T]
  ): List[T] = {
    var results = List[T]()
    try {
      val statement = connection.createStatement
      val rs        = statement.executeQuery(sql)
      results = mapper(rs)
      rs.close
    } catch {
      case e: Exception => e.printStackTrace()
    }
    results
  }
}
