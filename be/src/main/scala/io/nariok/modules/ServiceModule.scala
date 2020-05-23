package io.nariok.modules

import com.google.inject.AbstractModule
import io.nariok.services.{BlogService, BlogServiceImpl}
import net.codingwell.scalaguice.ScalaModule

import scala.concurrent.ExecutionContext

class ServiceModule(implicit executionContext: ExecutionContext) extends AbstractModule with ScalaModule {
  override def configure(): Unit =
    bind[BlogService].toInstance(new BlogServiceImpl())
}
