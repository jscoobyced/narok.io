package io.narok.configuration

import java.io.{File, FileOutputStream}

import com.typesafe.config.{Config, ConfigFactory}

import scala.annotation.tailrec
import scala.io.Source
import scala.util.{Failure, Success, Try}

object Configuration {
  @tailrec
  def getConfig(configuration: String): Config = {
    val applicationConf = new File(s"./conf/$configuration")
    if (applicationConf.exists()) ConfigFactory.parseFile(applicationConf)
    else {
      Try(Source.fromResource(s"$configuration")) match {
        case Success(inputStream) =>
          Try(inputStream.mkString) match {
            case Success(configBytes) =>
              val parentDirectory = applicationConf.getParentFile
              if (!parentDirectory.exists()) {
                parentDirectory.mkdir()
              }
              applicationConf.createNewFile()
              val fos = new FileOutputStream(applicationConf)
              fos.write(configBytes.getBytes())
              getConfig(configuration)
            case Failure(error: Throwable) =>
              println(s"Configuration file cannot be read: ${error.getMessage}")
              ConfigFactory.empty()
          }
        case Failure(error: Throwable) =>
          println(s"Configuration file not found: ${error.getMessage}")
          ConfigFactory.empty()
      }
    }
  }
}
