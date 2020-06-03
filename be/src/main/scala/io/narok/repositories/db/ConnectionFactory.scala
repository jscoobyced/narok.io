package io.narok.repositories.db

import java.sql.Connection

import com.zaxxer.hikari.{HikariConfig, HikariDataSource}
import io.narok.configuration.DbConfiguration

import scala.util.Try

// $COVERAGE-OFF$
object ConnectionFactory {
  val cpConfig                     = new HikariConfig()
  val dataSource: HikariDataSource = configure()

  def configure(): HikariDataSource = {
    cpConfig.setJdbcUrl(DbConfiguration.getUrl)
    cpConfig.setUsername(DbConfiguration.getUsername)
    cpConfig.setPassword(DbConfiguration.getPassword)
    cpConfig.addDataSourceProperty("cachePrepStmts", "true")
    cpConfig.addDataSourceProperty("prepStmtCacheSize", "250")
    cpConfig.addDataSourceProperty("prepStmtCacheSqlLimit", "2048")
    new HikariDataSource(cpConfig)
  }

  def getConnection: Try[Connection] =
    Try(dataSource.getConnection())

}
// $COVERAGE-ON$
