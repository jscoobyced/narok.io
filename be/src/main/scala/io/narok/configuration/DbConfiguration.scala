package io.narok.configuration

object DbConfiguration {
  private val config      = Configuration.getConfig
  def getUrl: String      = config.getString("app.db.url")
  def getDriver: String   = config.getString("app.db.driver")
  def getUsername: String = config.getString("app.db.user")
  def getPassword: String = config.getString("app.db.password")
}
