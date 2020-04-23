import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.headers.RawHeader
import akka.http.scaladsl.server.Directives
import akka.http.scaladsl.server.Directives._
import com.typesafe.config.{Config, ConfigFactory}
import spray.json.DefaultJsonProtocol

final case class Message(hello: String)

// collect your json format instances into a support trait:
trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val messageFormat = jsonFormat1(Message)
}

object Hello extends App with JsonSupport {
  implicit val actorSystem = ActorSystem()
  implicit val executionContext = actorSystem.dispatcher

  val route =
    path("hello") {
      get {
        respondWithHeaders(RawHeader("Access-Control-Allow-Origin", "*")) {
          complete(Message("Hello, Scala!"))
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