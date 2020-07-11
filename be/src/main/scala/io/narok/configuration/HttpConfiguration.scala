package io.narok.configuration

case class HttpConfigurationImpl(configFile: Option[String] = Some("application.conf")) {

  private val config       = Configuration.getConfig()
  def getPort: Int         = config.getInt("app.http.port")
  def getInterface: String = config.getString("app.http.interface")
  def getOrigin: String    = config.getString("app.http.origin")

}

object HttpConfiguration {
  private val config       = HttpConfigurationImpl()
  def getPort: Int         = config.getPort
  def getInterface: String = config.getInterface
  def getOrigin: String    = config.getOrigin

}
