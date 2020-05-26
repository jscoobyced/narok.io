package io.narok.repositories

import java.sql.{Connection, DriverManager, SQLException}

import com.google.inject.Inject
import com.typesafe.config.Config
import io.narok.configuration.RawConfiguration

import scala.util.Try

trait SqlConnectionCreator {
  def getConnection: Some[Connection]
}

class SqlConnectionCreatorImpl @Inject()(private val rawConfiguration: RawConfiguration) extends SqlConnectionCreator {
  val config: Config         = rawConfiguration.config
  val host: String           = config.getString("db.host")
  val port: Int              = config.getInt("db.port")
  val name: String           = config.getString("db.name")
  val url: String            = s"jdbc:mysql://$host:$port/$name"
  val driver: String         = "com.mysql.jdbc.Driver"
  val username: String       = config.getString("db.user")
  val password: String       = config.getString("db.password")
  var connection: Connection = _

  def connect(): Some[Connection] = {
    try {
      Class.forName(driver)
      connection = DriverManager.getConnection(url, username, password)
    } catch {
      case cnf: ClassNotFoundException => cnf.printStackTrace()
      case sqlException: SQLException  => sqlException.printStackTrace()
      case exception: Exception        => exception.printStackTrace()
    }
    Some(connection)
  }

  override def getConnection: Some[Connection] =
    if (Try(connection.isClosed).getOrElse(true)) connect()
    else Some(connection)

}
