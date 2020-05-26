package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.services.{BlogService, BlogServiceImpl}
import net.codingwell.scalaguice.ScalaModule

import scala.concurrent.ExecutionContext

class ServiceModule(implicit executionContext: ExecutionContext) extends AbstractModule with ScalaModule {
  override def configure(): Unit =
    bind[BlogService].to[BlogServiceImpl].in[com.google.inject.Singleton]
}
