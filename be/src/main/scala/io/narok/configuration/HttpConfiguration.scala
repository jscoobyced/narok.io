package io.narok.configuration

trait HttpConfiguration {
  def getPort: Int
  def getInterface: String
  def getOrigin: String
}

object HttpConfigurationImpl extends HttpConfiguration {

  private val config                = Configuration.getConfig
  override def getPort: Int         = config.getInt("app.http.port")
  override def getInterface: String = config.getString("app.http.interface")
  override def getOrigin: String    = config.getString("app.http.origin")
}
