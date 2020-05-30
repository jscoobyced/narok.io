package io.narok.configuration

import java.io.{File, FileOutputStream}

import com.typesafe.config.{Config, ConfigFactory}

import scala.annotation.tailrec

object Configuration {
  @tailrec
  def getConfig(configuration: String): Config = {
    val applicationConf = new File(s"./conf/$configuration")
    if (applicationConf.exists()) ConfigFactory.parseFile(applicationConf)
    else {
      val configBytes = ClassLoader
        .getSystemResourceAsStream(s"$configuration")
        .readAllBytes()
      val parentDirectory = applicationConf.getParentFile
      if (!parentDirectory.exists()) {
        parentDirectory.mkdir()
      }
      applicationConf.createNewFile()
      val fos = new FileOutputStream(applicationConf)
      fos.write(configBytes)
      getConfig(configuration)
    }
  }
}
