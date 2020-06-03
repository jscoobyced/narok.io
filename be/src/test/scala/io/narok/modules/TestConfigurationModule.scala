package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.configuration.HttpConfiguration
import net.codingwell.scalaguice.ScalaModule

class TestConfigurationModule extends AbstractModule with ScalaModule {
  override def configure(): Unit =
    bind[HttpConfiguration].toInstance(HttpConfigurationMock)
}

object HttpConfigurationMock extends HttpConfiguration {
  override def getInterface: String = "1.1.1.1"

  override def getOrigin: String = "whatever"

  override def getPort: Int = 1
}
