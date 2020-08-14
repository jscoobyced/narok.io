package io.narok.configuration

case class AuthConfigurationImpl() {
  private val config = Configuration.getConfig

  def getOwnerIds: List[String] = config.getString("app.auth.ownerId").split(",").toList
  def getClientId: String       = config.getString("app.auth.clientId")
}

object AuthConfiguration {
  private val config = AuthConfigurationImpl()

  def getOwnerIds: List[String] = config.getOwnerIds
  def getClientId: String       = config.getClientId
}
