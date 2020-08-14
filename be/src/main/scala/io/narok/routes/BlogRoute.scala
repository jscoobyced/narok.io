package io.narok.routes

import akka.http.scaladsl.model.{StatusCodes}
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.google.inject.Inject
import io.narok.configuration.HttpConfiguration
import io.narok.models.ErrorCode
import io.narok.models.blog.Article
import io.narok.models.http.{ArticleResponse, ResponseMessage, ResponseStatus}
import io.narok.services.blog.BlogService

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success, Try}

// $COVERAGE-OFF$
class BlogRoute @Inject()(implicit executionContext: ExecutionContext,
                          private val httpConnection: HttpConfiguration,
                          private val blogService: BlogService)
    extends BaseRoute {
  override protected def routes: Route = blogRoutes

  def blogRoutes: Route = {
    val origin: String = httpConnection.getOrigin
    val allowedHeaders = "*"
    concat(
      path("articles") {
        options {
          respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin),
                             RawHeader("Access-Control-Allow-Headers", allowedHeaders)) {
            complete(StatusCodes.OK)
          }
        } ~
          get {
            optionalHeaderValueByName("Authorization") { token =>
              respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin)) {
                val articles = blogService.getArticles
                complete(
                  ResponseMessage(ResponseStatus(true, None, None), Some(ArticleResponse(None, None, Some(articles)))))
              }
            }
          }
      },
      pathPrefix("article") {
        pathEnd {
          put {
            decodeRequest {
              entity(as[Article]) {
                article =>
                  respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin)) {
                    optionalHeaderValueByName("Authorization") {
                      token =>
                        val insertedBlogId = blogService.saveArticle(article, token)
                        if (insertedBlogId > 0)
                          complete(ResponseMessage(ResponseStatus(true, Some("Article created successfully."), None),
                                                   Some(ArticleResponse(Some(insertedBlogId), None, None))))
                        else
                          complete(
                            StatusCodes.BadRequest -> ResponseMessage(ResponseStatus(false,
                                                                                     Some("Article not created."),
                                                                                     Some(ErrorCode.CannotSave)),
                                                                      None))
                    }
                  }
              }
            }
          }
        } ~
          path(Segment) {
            id =>
              options {
                respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin),
                                   RawHeader("Access-Control-Allow-Headers", allowedHeaders)) {
                  complete(StatusCodes.OK)
                }
              } ~
                post {
                  decodeRequest {
                    entity(as[Article]) {
                      article =>
                        respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin),
                                           RawHeader("Access-Control-Allow-Headers", allowedHeaders)) {
                          optionalHeaderValueByName("Authorization") {
                            token =>
                              Try(id.toInt) match {
                                case Success(blogId) =>
                                  val result = blogService.updateArticle(blogId, article, token)
                                  if (result)
                                    complete(
                                      ResponseMessage(ResponseStatus(true, Some("Article saved successfully."), None),
                                                      Some(ArticleResponse(Some(blogId), None, None))))
                                  else
                                    complete(
                                      StatusCodes.Forbidden -> ResponseMessage(
                                        ResponseStatus(false, Some("Article not saved."), Some(ErrorCode.CannotSave)),
                                        None))
                                case Failure(error) =>
                                  complete(
                                    StatusCodes.BadRequest -> ResponseMessage(
                                      ResponseStatus(false,
                                                     Some(s"Not an article reference. ${error.getMessage}"),
                                                     Some(ErrorCode.WrongDataType)),
                                      None))
                              }
                          }
                        }
                    }
                  }
                } ~
                get {
                  respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin)) {
                    optionalHeaderValueByName("Authorization") {
                      token =>
                        Try(id.toInt) match {
                          case Success(blogId) =>
                            blogService.getArticle(blogId) match {
                              case Some(article: Article) =>
                                complete(
                                  ResponseMessage(ResponseStatus(true, Some("Article retrieved successfully."), None),
                                                  Some(ArticleResponse(None, Some(article), None))))
                              case _ =>
                                complete(
                                  StatusCodes.NotFound -> ResponseMessage(ResponseStatus(false,
                                                                                         Some("Article not found."),
                                                                                         Some(ErrorCode.CannotGet)),
                                                                          None))
                            }
                          case Failure(error) =>
                            complete(
                              StatusCodes.BadRequest -> ResponseMessage(
                                ResponseStatus(false,
                                               Some(s"Not an article reference. ${error.getMessage}"),
                                               Some(ErrorCode.WrongDataType)),
                                None))
                        }
                    }
                  }
                }
          }
      }
    )
  }
}
// $COVERAGE-ON$
