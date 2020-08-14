package io.narok.configuration

case class AuthConfigurationImpl() {
  private val config = Configuration.getConfig

  def getOwnerId: String  = config.getString("app.auth.ownerId")
  def getClientId: String = config.getString("app.auth.clientId")
}

object AuthConfiguration {
  private val config = AuthConfigurationImpl()

  def getOwnerId: String  = config.getOwnerId
  def getClientId: String = config.getClientId
}
