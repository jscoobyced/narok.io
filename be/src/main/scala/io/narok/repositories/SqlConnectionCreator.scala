package io.narok.repositories

import java.sql.{Connection, DriverManager, SQLException}

import com.google.inject.Inject
import com.typesafe.config.Config
import io.narok.configuration.RawConfiguration

import scala.util.Try

trait SqlConnectionCreator {
  def getConnection: Option[Connection]
}

class SqlConnectionCreatorImpl @Inject()(private val rawConfiguration: RawConfiguration) extends SqlConnectionCreator {
  val config: Config         = rawConfiguration.config
  val url: String            = config.getString("db.url")
  val driver: String         = config.getString("db.driver")
  val username: String       = config.getString("db.user")
  val password: String       = config.getString("db.password")
  var connection: Connection = _

  def connect(): Option[Connection] = {
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

  override def getConnection: Option[Connection] =
    if (Try(connection.isClosed).getOrElse(true)) connect()
    else Some(connection)

}
