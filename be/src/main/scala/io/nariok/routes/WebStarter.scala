package io.nariok.routes

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.Http.ServerBinding
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.directives.RouteDirectives
import com.google.inject.Inject
import io.nariok.conf.RawConfiguration

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class WebStarter @Inject()(private val routes: Set[WebRoute], private val rawConfiguration: RawConfiguration)(
    implicit actorSystem: ActorSystem,
    executionContext: ExecutionContext
) {

  def start(): Future[ServerBinding] = {
    val binding = Http()
      .bindAndHandle(
        handler = (routes).map(_.route).foldLeft[Route](RouteDirectives.reject)(_ ~ _),
        interface = rawConfiguration.config.getString("http.interface"),
        port = rawConfiguration.config.getInt("http.port")
      )
    binding
      .onComplete {
        case Failure(e) => println("Failed to launch http server", e)
        case Success(binding: Http.ServerBinding) =>
          println(
            s"`Server is listening on http://${binding.localAddress.getHostName}:${binding.localAddress.getPort}"
          )
      }
    binding
  }
}
