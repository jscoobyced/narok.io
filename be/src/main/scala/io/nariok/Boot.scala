package io.nariok

import java.util.concurrent.Executors

import akka.actor.ActorSystem
import com.google.inject.Guice
import io.nariok.modules.ApplicationModule
import io.nariok.routes.WebStarter

import scala.concurrent.ExecutionContext

object Boot extends App {
  implicit private val executionContext =
    ExecutionContext.fromExecutor(Executors.newFixedThreadPool(Runtime.getRuntime.availableProcessors() * 2))
  implicit private val system = ActorSystem()

  private val injector = Guice.createInjector(new ApplicationModule())

  injector.getInstance(classOf[WebStarter]).start()
}
