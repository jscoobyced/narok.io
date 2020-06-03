package io.narok

import java.io.File

import akka.actor.ActorSystem
import com.google.inject.util.Modules
import com.google.inject.{AbstractModule, Guice, Injector}
import com.typesafe.config.ConfigFactory
import io.narok.modules.ApplicationModule
import net.codingwell.scalaguice.ScalaModule
import org.scalatest.funspec.AnyFunSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.{BeforeAndAfterEach, Inside, Inspectors, OptionValues}

import scala.concurrent.ExecutionContext.global

abstract class BaseTest
    extends AnyFunSpec
    with Matchers
    with OptionValues
    with Inside
    with Inspectors
    with BeforeAndAfterEach {
  implicit private val system: ActorSystem = ActorSystem()
  System.setProperty("config.resource", "test.conf")
  ConfigFactory.invalidateCaches()

  protected val injector: Injector =
    Guice.createInjector(
      Modules
        .`override`(new ApplicationModule()(global, system))
        .`with`(overriding())
    )

  override def afterEach(): Unit = {
    val applicationConf = new File(s"./conf/application.conf")
    if (applicationConf.exists()) applicationConf.delete()
  }

  protected def overriding(): ScalaModule = new AbstractModule with ScalaModule
}
