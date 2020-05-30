package io.narok.configuration

import com.typesafe.config.{Config, ConfigFactory}

object Configuration {

  def getConfig: Config =
    ConfigFactory.load()
}
