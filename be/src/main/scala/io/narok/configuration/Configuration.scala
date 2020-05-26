package io.narok.configuration

import java.io.{File, FileOutputStream}

import com.typesafe.config.{Config, ConfigFactory}

object Configuration {
  @scala.annotation.tailrec
  def getConfig: Config = {
    val applicationConf = new File("./conf/application.conf")
    if (applicationConf.exists()) ConfigFactory.parseFile(applicationConf)
    else {
      val configBytes = ClassLoader
        .getSystemResourceAsStream("application.conf")
        .readAllBytes()
      val parentDirectory = applicationConf.getParentFile
      if (!parentDirectory.exists()) {
        parentDirectory.mkdir()
      }
      applicationConf.createNewFile()
      val fos = new FileOutputStream(applicationConf)
      fos.write(configBytes)
      getConfig
    }
  }
}
