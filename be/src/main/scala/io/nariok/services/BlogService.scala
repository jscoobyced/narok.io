package io.nariok.services

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives._
import com.typesafe.config.{Config, ConfigFactory}
import io.nariok.conf.Configuration
import io.nariok.models.blog.{Article, BlogContent}
import io.nariok.repositories.MysqlRepository
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val blogContentFormat: RootJsonFormat[BlogContent] = jsonFormat6(BlogContent)
  implicit val articleFormat: RootJsonFormat[Article] = jsonFormat5(Article)
}

trait Database {
  val database = new MysqlRepository
  database.connect()
  val articlesSql = "SELECT id, title, created, modified FROM blog " +
    "ORDER BY created DESC, modified DESC LIMIT 5"
  val blogs = database.executeQuery(articlesSql, None, MysqlRepository.toArticle)
  val contentSql = "SELECT id, content, type, blog_id, alttext, align FROM blog_content"
  val contents = database.executeQuery(contentSql, None, MysqlRepository.toBlogContent)

  implicit val articles: List[Article] = blogs.map(blog => {
    var article: Article = blog
    contents.filter(_.blogId == blog.id).foreach(content => {
      article = article.addContent(content)
    })
    article
  })
  database.disconnect()
}

object BlogService extends App with JsonSupport with Database {
  implicit val actorSystem = ActorSystem()
  implicit val executionContext = actorSystem.dispatcher

  val route =
    path("articles") {
      get {
        respondWithHeaders(RawHeader("Access-Control-Allow-Origin", "*")) {
          complete(articles)
        }
      }
    }

  val config: Config = Configuration.getConfig()
  val bindingFuture = Http().bindAndHandle(route, config.getString("http.interface"), config.getInt("http.port"))
}
