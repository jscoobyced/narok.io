package io.narok

import akka.actor.ActorSystem
import com.google.inject.util.Modules
import com.google.inject.{AbstractModule, Guice, Injector}
import com.typesafe.config.ConfigFactory
import io.narok.modules.ApplicationModule
import net.codingwell.scalaguice.ScalaModule
import org.scalatest.funspec.AnyFunSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.{Inside, Inspectors, OptionValues}

import scala.concurrent.ExecutionContext.global

abstract class BaseTest extends AnyFunSpec with Matchers with OptionValues with Inside with Inspectors {
  implicit private val system: ActorSystem = ActorSystem()
  System.setProperty("config.resource", "test.conf")
  ConfigFactory.invalidateCaches()

  protected val injector: Injector =
    Guice.createInjector(
      Modules
        .`override`(new ApplicationModule()(global, system))
        .`with`(overriding())
    )

  protected def overriding(): ScalaModule = new AbstractModule with ScalaModule
}
