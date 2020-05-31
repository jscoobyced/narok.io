package io.narok.configuration

import java.io.{File, FileOutputStream}

import com.typesafe.config.{Config, ConfigFactory, ConfigRenderOptions}

import scala.annotation.tailrec

object Configuration {

  @tailrec
  def getConfig: Config = {
    val applicationConf = new File("./conf/application.conf")
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
      getConfig
    }
  }
}
