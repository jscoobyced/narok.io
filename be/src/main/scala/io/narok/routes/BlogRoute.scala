package io.narok.routes

import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import com.google.inject.Inject
import io.narok.configuration.HttpConfigurationImpl
import io.narok.models.blog.Article
import io.narok.models.http.{FailResponse, ResponseData, SuccessResponse}
import io.narok.services.blog.BlogService

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success, Try}

// $COVERAGE-OFF$
class BlogRoute @Inject()(implicit executionContext: ExecutionContext, private val blogService: BlogService)
    extends BaseRoute {
  override protected def routes: Route = blogRoutes

  def blogRoutes: Route = {
    val origin: String = HttpConfigurationImpl.getOrigin
    concat(
      path("articles") {
        get {
          respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin)) {
            complete(blogService.getArticles)
          }
        }
      },
      pathPrefix("article") {
        pathEnd {
          post {
            decodeRequest {
              entity(as[Article]) { article =>
                respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin)) {
                  val insertedBlogId = blogService.saveArticle(article)
                  if (insertedBlogId > 0)
                    complete(SuccessResponse(ResponseData("Article saved successfully", insertedBlogId)))
                  else complete(FailResponse("Article not saved."))
                }
              }
            }
          }
        } ~
          path(Segment) {
            id =>
              put {
                decodeRequest {
                  entity(as[Article]) {
                    article =>
                      respondWithHeaders(RawHeader("Access-Control-Allow-Origin", origin)) {
                        Try(id.toInt) match {
                          case Success(blogId) =>
                            val result = blogService.updateArticle(blogId, article)
                            if (result)
                              complete(SuccessResponse(ResponseData("Article updated successfully", blogId)))
                            else complete(FailResponse("Article not saved."))
                          case Failure(error) =>
                            complete(FailResponse(s"Not an article reference. ${error.getMessage}"))
                        }
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
