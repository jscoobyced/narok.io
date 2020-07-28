package io.narok.configuration

case class DbConfigurationImpl() {
  private val config = Configuration.getConfig

  def getUrl: String      = config.getString("app.db.url")
  def getUsername: String = config.getString("app.db.user")
  def getPassword: String = config.getString("app.db.password")
}

object DbConfiguration {
  private val config      = DbConfigurationImpl()
  def getUrl: String      = config.getUrl
  def getUsername: String = config.getUsername
  def getPassword: String = config.getPassword
}
