package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.configuration.{HttpConfiguration, HttpConfigurationImpl}
import net.codingwell.scalaguice.ScalaModule

class ConfigurationModule extends AbstractModule with ScalaModule {

  override def configure(): Unit =
    bind[HttpConfiguration].toInstance(HttpConfigurationImpl)

}
