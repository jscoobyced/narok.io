package io.nariok.routes

import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives.{complete, get, path, respondWithHeaders}
import akka.http.scaladsl.server.Route
import com.google.inject.Inject
import io.nariok.conf.RawConfiguration
import io.nariok.services.BlogService

import scala.concurrent.ExecutionContext

class BlogRoute @Inject()(implicit executionContext: ExecutionContext,
                          private val blogService: BlogService,
                          private val rawConfiguration: RawConfiguration)
    extends BaseRoute {
  override protected def routes: Route = blogRoute

  def blogRoute: Route = path("articles") {
    get {
      respondWithHeaders(RawHeader("Access-Control-Allow-Origin", rawConfiguration.config.getString("http.origin"))) {
        complete(blogService.getArticles())
      }
    }
  }
}
