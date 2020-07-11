package io.narok.routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{complete, handleExceptions}
import akka.http.scaladsl.server.{ExceptionHandler, Route}
import io.narok.models.blog.{Article, BlogContent, SuccessArticleResponse}
import io.narok.models.http.{FailResponse, ResponseData, SuccessResponse}
import io.narok.models.{ErrorCode, User}
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

trait WebRoute {
  val route: Route
}

trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val blogContentFormat: RootJsonFormat[BlogContent]         = jsonFormat7(BlogContent)
  implicit val userFormat: RootJsonFormat[User]                       = jsonFormat6(User)
  implicit val articleFormat: RootJsonFormat[Article]                 = jsonFormat7(Article)
  implicit val failedResponse: RootJsonFormat[FailResponse]           = jsonFormat2(FailResponse)
  implicit val responseDataFormat: RootJsonFormat[ResponseData]       = jsonFormat2(ResponseData)
  implicit val successResponseFormat: RootJsonFormat[SuccessResponse] = jsonFormat1(SuccessResponse)
  implicit val successArticleResponseFormat: RootJsonFormat[SuccessArticleResponse] = jsonFormat1(
    SuccessArticleResponse)
}

abstract class BaseRoute extends WebRoute with JsonSupport {

  // $COVERAGE-OFF$
  implicit protected def unhandledExceptionsHandler: ExceptionHandler =
    ExceptionHandler {
      case e: Exception =>
        complete(StatusCodes.InternalServerError -> FailResponse(e.getMessage, ErrorCode.Unhandled))
    }
  // $COVERAGE-ON$

  final override val route: Route = handleExceptions(unhandledExceptionsHandler) {
    routes
  }

  protected def routes: Route
}
