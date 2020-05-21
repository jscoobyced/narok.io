package io.nariok.conf

import java.io.{File, FileOutputStream}

import com.typesafe.config.{Config, ConfigFactory}

object Configuration {
  def getConfig(): Config = {
    val applicationConf = new File("./conf/application.conf")
    if (applicationConf.exists()) ConfigFactory.parseFile(applicationConf)
    else {
      val configBytes = ClassLoader
        .getSystemResourceAsStream("application.conf")
        .readAllBytes()
      applicationConf.createNewFile()
      val fos = new FileOutputStream(applicationConf)
      fos.write(configBytes)
      getConfig()
    }
  }
}

final case class RawConfiguration(config: Config)
