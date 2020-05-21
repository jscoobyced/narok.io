package io.nariok

import java.util.concurrent.Executors

import akka.actor.ActorSystem
import com.google.inject.Guice

import scala.concurrent.ExecutionContext

object Boot extends App {
  implicit private val executionContext =
    ExecutionContext.fromExecutor(Executors.newFixedThreadPool(Runtime.getRuntime.availableProcessors() * 2))
  implicit private val system = ActorSystem()

  private val injector = Guice.createInjector(new AppModule())

  injector.getInstance(classOf[WebStarter]).start()
}
