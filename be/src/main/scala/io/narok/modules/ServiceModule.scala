package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.services.blog.{BlogService, BlogServiceImpl, GoogleService, GoogleServiceImpl}
import net.codingwell.scalaguice.ScalaModule

import scala.concurrent.ExecutionContext

class ServiceModule(implicit executionContext: ExecutionContext) extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    bind[BlogService].to[BlogServiceImpl].in[com.google.inject.Singleton]
    bind[GoogleService].to[GoogleServiceImpl].in[com.google.inject.Singleton]
  }
}
