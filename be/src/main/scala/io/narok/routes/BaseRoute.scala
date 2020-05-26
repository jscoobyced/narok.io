package io.narok.routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{complete, handleExceptions}
import akka.http.scaladsl.server.{ExceptionHandler, Route}
import io.narok.models.blog.{Article, BlogContent}
import io.narok.models.http.FailResponse
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait WebRoute {
  val route: Route
}

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val blogContentFormat: RootJsonFormat[BlogContent] = jsonFormat6(BlogContent)
  implicit val articleFormat: RootJsonFormat[Article]         = jsonFormat5(Article)
  implicit val failedResponse: RootJsonFormat[FailResponse]   = jsonFormat1(FailResponse)
}

abstract class BaseRoute extends WebRoute with JsonSupport {

  implicit protected def unhandledExceptionsHandler: ExceptionHandler =
    ExceptionHandler {
      case e: Exception =>
        complete(StatusCodes.InternalServerError -> FailResponse(e.getMessage))
    }

  final override val route: Route = handleExceptions(unhandledExceptionsHandler) {
    routes
  }

  protected def routes: Route
}
