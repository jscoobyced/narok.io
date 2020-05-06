package io.nariok.services

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives._
import com.typesafe.config.{Config, ConfigFactory}
import io.nariok.models.blog.{Article, BlogContent}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val blogContentFormat: RootJsonFormat[BlogContent] = jsonFormat4(BlogContent)
  implicit val articleFormat: RootJsonFormat[Article] = jsonFormat5(Article)
}

object BlogService extends App with JsonSupport {
  implicit val actorSystem = ActorSystem()
  implicit val executionContext = actorSystem.dispatcher

  val loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies ut augue eu imperdiet. Donec tincidunt congue tortor, eu finibus ex facilisis ut. Etiam aliquam augue non magna commodo auctor. Phasellus nec tellus egestas, gravida ipsum nec, semper augue. In facilisis quam purus, congue egestas augue gravida at. Aenean et justo placerat, ultrices nisi sit amet, molestie risus. Duis eu nulla eget nisi interdum interdum. Curabitur ornare vel odio rhoncus aliquet. Praesent luctus rutrum pharetra. Nullam sed eros pharetra urna porttitor viverra. Nulla facilisi. Sed molestie sodales rhoncus. Cras gravida porttitor nulla ac suscipit. Suspendisse sed neque nunc. Praesent ac varius nisi. Donec suscipit elit sit amet eros scelerisque tempor. Curabitur bibendum turpis id rhoncus ultricies. Maecenas hendrerit finibus felis, ac lobortis ex vestibulum sit amet. Donec condimentum aliquet nulla, sed scelerisque orci. Phasellus massa felis, maximus eget dolor ut, dapibus semper ante. Cras non neque lectus. Suspendisse nec erat nec nulla pretium ultricies."
  val textBlogContent = BlogContent(loremIpsum, "text")
  val imageBlogContent = BlogContent("/images/demon-logo-small.png", "image", Some("Demon logo"), Some("center"))
  val article1 = Article(1, "Akka application", List(textBlogContent, imageBlogContent), "2020-05-06 18:13", "2020-05-06 18:13")
  val article2 = Article(2, "Akka application", List(imageBlogContent), "2020-05-06 18:13", "2020-05-06 18:13")
  val articles = List(article1, article2)

  val route =
    path("articles") {
      get {
        respondWithHeaders(RawHeader("Access-Control-Allow-Origin", "*")) {
          complete(articles)
        }
      }
    }

  val config: Config = ConfigFactory.load()
  val bindingFuture = Http().bindAndHandle(route, config.getString("http.interface"), config.getInt("http.port"))
  /*
  bindingFuture
    .flatMap(_.unbind())
    .onComplete(_ => actorSystem.terminate())
   */
}
