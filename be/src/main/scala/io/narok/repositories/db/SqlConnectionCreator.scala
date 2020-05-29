package io.narok.repositories.db

import java.sql.Connection

import com.google.inject.Inject
import com.typesafe.config.Config
import com.zaxxer.hikari.{HikariConfig, HikariDataSource}
import io.narok.configuration.RawConfiguration

import scala.util.Try

trait SqlConnectionCreator {
  def getConnection: Try[Connection]
}

class SqlConnectionCreatorImpl @Inject()(private val rawConfiguration: RawConfiguration) extends SqlConnectionCreator {
  val config: Config               = rawConfiguration.config
  val url: String                  = config.getString("db.url")
  val driver: String               = config.getString("db.driver")
  val username: String             = config.getString("db.user")
  val password: String             = config.getString("db.password")
  val cpConfig                     = new HikariConfig()
  val dataSource: HikariDataSource = configure()

  def configure(): HikariDataSource = {
    cpConfig.setJdbcUrl(url)
    cpConfig.setUsername(username)
    cpConfig.setPassword(password)
    cpConfig.addDataSourceProperty("cachePrepStmts", "true")
    cpConfig.addDataSourceProperty("prepStmtCacheSize", "250")
    cpConfig.addDataSourceProperty("prepStmtCacheSqlLimit", "2048")
    new HikariDataSource(cpConfig)
  }

  override def getConnection: Try[Connection] =
    Try(dataSource.getConnection())

}
