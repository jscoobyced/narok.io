package io.narok.configuration

import java.io.{File, FileOutputStream}

import com.typesafe.config.{Config, ConfigFactory, ConfigRenderOptions}

import scala.annotation.tailrec

object Configuration {

  @tailrec
  def getConfig(configFile: Option[String] = Some("application.conf")): Config = {
    val applicationConf = new File(s"./conf/${configFile.get}")
    if (applicationConf.exists()) ConfigFactory.parseFile(applicationConf)
    else {
      val configuration   = ConfigFactory.load()
      val parentDirectory = applicationConf.getParentFile
      if (!parentDirectory.exists()) {
        parentDirectory.mkdir()
      }
      applicationConf.createNewFile()
      val fos = new FileOutputStream(applicationConf)
      val app = "app"
      val data = ("\"" + app + "\": " + configuration
        .getObject(app)
        .render(ConfigRenderOptions.concise.setFormatted(true))).getBytes
      fos.write(data)
      getConfig()
    }
  }
}
