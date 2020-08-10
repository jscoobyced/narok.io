package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.services.authentication.{GoogleService, GoogleServiceImpl}
import io.narok.services.blog.{BlogService, BlogServiceImpl}
import io.narok.services.security.{HtmlSanitizer, HtmlSanitizerImpl}
import net.codingwell.scalaguice.ScalaModule

import scala.concurrent.ExecutionContext

class ServiceModule(implicit executionContext: ExecutionContext) extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    bind[BlogService].to[BlogServiceImpl].in[com.google.inject.Singleton]
    bind[GoogleService].to[GoogleServiceImpl].in[com.google.inject.Singleton]
    bind[HtmlSanitizer].to[HtmlSanitizerImpl].in[com.google.inject.Singleton]
  }
}
