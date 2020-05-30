package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.configuration.{Configuration, RawConfiguration}
import net.codingwell.scalaguice.ScalaModule

class ConfigurationModule extends AbstractModule with ScalaModule {
  override def configure(): Unit = {

    val rawConfiguration = RawConfiguration(Configuration.getConfig("application.conf"))
    bind[RawConfiguration].toInstance(rawConfiguration)
  }
}
