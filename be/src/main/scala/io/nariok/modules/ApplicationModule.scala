package io.nariok.modules

import akka.actor.ActorSystem
import com.google.inject.AbstractModule
import net.codingwell.scalaguice.ScalaModule

import scala.concurrent.ExecutionContext

class ApplicationModule(implicit executionContext: ExecutionContext, actorSystem: ActorSystem)
    extends AbstractModule
    with ScalaModule {
  override def configure(): Unit = {
    bind[ActorSystem].toInstance(actorSystem)
    bind[ExecutionContext].toInstance(executionContext)

    install(new ConfigurationModule())
  }
}
