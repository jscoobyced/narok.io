package io.nariok.repositories

import java.sql.{Connection, DriverManager, ResultSet, SQLException}

import com.typesafe.config.{Config}
import io.nariok.conf.Configuration
import io.nariok.models.blog.{Article, BlogContent}

import scala.util.Try

abstract class DatabaseRepository {

  def connect(): Unit

  def disconnect(): Unit

  //def executeQuery[T](sql: String, parameters: Option[Map[String, Any]]): List[T]
}

class MysqlRepository extends DatabaseRepository {
  val config: Config = Configuration.getConfig()
  val host = config.getString("db.host")
  val port = config.getInt("db.port")
  val name = config.getString("db.name")
  val url = s"jdbc:mysql://$host:$port/$name"
  val driver = "com.mysql.jdbc.Driver"
  val username = config.getString("db.user")
  val password = config.getString("db.password")
  var connection: Connection = _

  override def connect(): Unit = {
    try {
      Class.forName(driver)
      connection = DriverManager.getConnection(url, username, password)
    } catch {
      case cnf: ClassNotFoundException => cnf.printStackTrace()
      case sql: SQLException => sql.printStackTrace()
      case e: Exception => e.printStackTrace()
    }
  }

  override def disconnect(): Unit = {
    try {
      connection.close()
    } catch {
      case sql: SQLException => sql.printStackTrace()
    }
  }

  def executeQuery[Article](
                             sql: String,
                             parameters: Option[Map[String, Any]],
                             mapper: ResultSet => List[Article]
                           ): List[Article] = {
    var results = List[Article]()
    try {
      val statement = connection.createStatement
      val rs = statement.executeQuery(sql)
      results = mapper(rs)
      rs.close
    } catch {
      case e: Exception => e.printStackTrace()
    }
    results
  }
}

object MysqlRepository {
  def resultSetIterator(resultSet: ResultSet): Iterator[ResultSet] = {
    new Iterator[ResultSet] {
      def hasNext = resultSet.next()

      def next() = resultSet
    }
  }

  def toArticle(resultSet: ResultSet): List[Article] = {
    val articleIterator = resultSetIterator(resultSet)
    val articles = articleIterator.map(result => {
      Article(
        result.getInt(1),
        result.getString(2),
        List(),
        result.getDate(3).toString,
        result.getDate(4).toString
      )
    })
    articles.toList
  }

  def toBlogContent(resultSet: ResultSet): List[BlogContent] = {
    val contentIterator = resultSetIterator(resultSet)
    val contents = Try(
      contentIterator.map(result => {
        BlogContent(
          result.getInt(1),
          result.getString(2),
          result.getInt(3) match {
            case 0 => "text"
            case 1 => "image"
            case _ => "text"
          },
          result.getInt(4),
          Some(result.getString(5)),
          result.getInt(6) match {
            case 0 => Some("left")
            case 1 => Some("center")
            case 2 => Some("right")
            case _ => Some("left")
          }
        )
      })
    )
    contents.getOrElse(List[BlogContent]()).toList
  }
}
