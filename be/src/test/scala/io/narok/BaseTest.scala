package io.narok

import java.io.File

import akka.actor.ActorSystem
import com.typesafe.config.ConfigFactory
import org.scalatest.funspec.AnyFunSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.{BeforeAndAfterEach, Inside, Inspectors, OptionValues}

import scala.concurrent.ExecutionContext
import scala.concurrent.ExecutionContext.global

abstract class BaseTest
    extends AnyFunSpec
    with Matchers
    with OptionValues
    with Inside
    with Inspectors
    with BeforeAndAfterEach {
  System.setProperty("config.resource", "test.conf")
  ConfigFactory.invalidateCaches()
  implicit protected val system: ActorSystem                = ActorSystem()
  implicit protected val executionContext: ExecutionContext = global

  override def afterEach(): Unit = {
    val applicationConf = new File(s"./conf/application.conf")
    if (applicationConf.exists()) applicationConf.delete()
    val testConf = new File(s"./conf/test.conf")
    if (testConf.exists()) testConf.delete()
  }
}
