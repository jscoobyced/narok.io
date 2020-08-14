package io.narok

import java.io.File

import akka.actor.ActorSystem
import com.typesafe.config.ConfigFactory
import io.narok.models.User
import io.narok.models.blog.{Article, BlogContent}
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

  override def afterEach(): Unit = cleanUp()

  override def beforeEach(): Unit = cleanUp()

  private def cleanUp(): Unit = {
    val applicationConf = new File(s"./conf/application.conf")
    if (applicationConf.exists()) applicationConf.delete()
    val testConf = new File(s"./conf/test.conf")
    if (testConf.exists()) testConf.delete()
  }

  def article(): Article = {
    val blogContent1 = BlogContent(1, "test", "text", 1, 0, Some(""), Some("left"))
    val blogContent2 = BlogContent(2, "test", "image", 1, 0, Some(""), Some("center"))
    val blogContent3 = BlogContent(3, "test", "undefined", 1, 0, Some(""), Some("right"))
    val blogContent4 = BlogContent(4, "test", "undefined", 1, 0, Some(""), Some(""))
    val blogContent5 = BlogContent(5, "test", "undefined", 1, 0, Some(""))
    Article(1,
            User("0", "Admin"),
            "test",
            List(blogContent1, blogContent2, blogContent3, blogContent4, blogContent5),
            "now",
            "now",
            0)
  }

  def articles(): List[Article] = List(article())
}
