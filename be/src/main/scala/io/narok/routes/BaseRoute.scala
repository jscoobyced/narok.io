package io.narok.routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{complete, handleExceptions}
import akka.http.scaladsl.server.{ExceptionHandler, Route}
import io.narok.models.blog.{Article, BlogContent}
import io.narok.models.http.{ArticleResponse, ResponseMessage, ResponseStatus}
import io.narok.models.{ErrorCode, User}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait WebRoute {
  val route: Route
}

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val blogContentFormat: RootJsonFormat[BlogContent]         = jsonFormat7(BlogContent)
  implicit val userFormat: RootJsonFormat[User]                       = jsonFormat4(User)
  implicit val articleFormat: RootJsonFormat[Article]                 = jsonFormat7(Article)
  implicit val articleResponseFormat: RootJsonFormat[ArticleResponse] = jsonFormat4(ArticleResponse)
  implicit val responseStatusFormat: RootJsonFormat[ResponseStatus]   = jsonFormat3(ResponseStatus)
  implicit val responseMessageFormat: RootJsonFormat[ResponseMessage] = jsonFormat2(ResponseMessage)
}

abstract class BaseRoute extends WebRoute with JsonSupport {

  // $COVERAGE-OFF$
  implicit protected def unhandledExceptionsHandler: ExceptionHandler =
    ExceptionHandler {
      case e: Exception =>
        complete(
          StatusCodes.InternalServerError -> ResponseMessage(
            ResponseStatus(success = false, Some(e.getMessage), Some(ErrorCode.Unhandled)),
            None))
    }
  // $COVERAGE-ON$

  final override val route: Route = handleExceptions(unhandledExceptionsHandler) {
    routes
  }

  protected def routes: Route
}
