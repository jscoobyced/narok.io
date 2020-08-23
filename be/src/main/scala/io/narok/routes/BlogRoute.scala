package io.narok.routes

import akka.http.scaladsl.model.StatusCodes
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

  def blogRoutes: Route = concat(
    path("articles") {
      options {
        responseHeaders {
          complete(StatusCodes.OK)
        }
      } ~
        get {
          parameters("page".?, "perPage".?) {
            (page, perPage) =>
              optionalHeaderValueByName("Authorization") {
                token =>
                  responseHeaders {
                    val currentPage = page match {
                      case Some(value) => value.toInt
                      case _           => 0
                    }
                    val currentPerPage = perPage match {
                      case Some(value) => value.toInt
                      case _           => 5
                    }
                    val articles         = blogService.getArticles(currentPage, currentPerPage, token)
                    val numberOfArticles = blogService.countArticles
                    complete(ResponseMessage(ResponseStatus(success = true, None, None),
                                             Some(ArticleResponse(None, numberOfArticles, None, Some(articles)))))
                  }
              }
          }
        }
    },
    pathPrefix("article") {
      pathEnd {
        options {
          responseHeaders {
            complete(StatusCodes.OK)
          }
        } ~
          put {
            decodeRequest {
              entity(as[Article]) {
                article =>
                  responseHeaders {
                    optionalHeaderValueByName("Authorization") {
                      token =>
                        val insertedBlogId = blogService.saveArticle(article, token)
                        if (insertedBlogId > 0)
                          complete(
                            ResponseMessage(ResponseStatus(success = true, Some("Article created successfully."), None),
                                            Some(ArticleResponse(Some(insertedBlogId), 1, None, None))))
                        else
                          complete(
                            StatusCodes.BadRequest -> ResponseMessage(ResponseStatus(success = false,
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
              responseHeaders {
                complete(StatusCodes.OK)
              }
            } ~
              post {
                decodeRequest {
                  entity(as[Article]) {
                    article =>
                      responseHeaders {
                        optionalHeaderValueByName("Authorization") {
                          token =>
                            Try(id.toInt) match {
                              case Success(blogId) =>
                                val result = blogService.updateArticle(blogId, article, token)
                                if (result)
                                  complete(
                                    ResponseMessage(ResponseStatus(success = true,
                                                                   Some("Article saved successfully."),
                                                                   None),
                                                    Some(ArticleResponse(Some(blogId), 1, None, None))))
                                else
                                  complete(
                                    StatusCodes.Forbidden -> ResponseMessage(ResponseStatus(success = false,
                                                                                            Some("Article not saved."),
                                                                                            Some(ErrorCode.CannotSave)),
                                                                             None))
                              case Failure(error) =>
                                complete(
                                  StatusCodes.BadRequest -> ResponseMessage(
                                    ResponseStatus(success = false,
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
                responseHeaders {
                  optionalHeaderValueByName("Authorization") {
                    token =>
                      Try(id.toInt) match {
                        case Success(blogId) =>
                          blogService.getArticle(blogId, token) match {
                            case Some(article: Article) =>
                              complete(
                                ResponseMessage(ResponseStatus(success = true,
                                                               Some("Article retrieved successfully."),
                                                               None),
                                                Some(ArticleResponse(None, 1, Some(article), None))))
                            case _ =>
                              complete(
                                StatusCodes.NotFound -> ResponseMessage(ResponseStatus(success = false,
                                                                                       Some("Article not found."),
                                                                                       Some(ErrorCode.CannotGet)),
                                                                        None))
                          }
                        case Failure(error) =>
                          complete(
                            StatusCodes.BadRequest -> ResponseMessage(
                              ResponseStatus(success = false,
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

  private def responseHeaders = {
    val origin: String = httpConnection.getOrigin
    val allowedHeaders = "*"
    val allowedMethods = "POST, GET, OPTIONS, PUT"
    respondWithHeaders(
      RawHeader("Access-Control-Allow-Origin", origin),
      RawHeader("Access-Control-Allow-Headers", allowedHeaders),
      RawHeader("Access-Control-Allow-Methods", allowedMethods)
    )
  }
}
// $COVERAGE-ON$
