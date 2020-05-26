package io.narok

import java.util.concurrent.Executors

import akka.actor.ActorSystem
import com.google.inject.Guice
import io.narok.modules.ApplicationModule

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor}

object Boot extends App {
  implicit private val executionContext: ExecutionContextExecutor =
    ExecutionContext.fromExecutor(Executors.newFixedThreadPool(Runtime.getRuntime.availableProcessors() * 2))
  implicit private val system: ActorSystem = ActorSystem()

  private val injector = Guice.createInjector(new ApplicationModule())

  injector.getInstance(classOf[Starter]).start()
}
