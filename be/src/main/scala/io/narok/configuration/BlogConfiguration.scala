package io.narok.configuration

case class BlogConfigurationImpl() {
  private val config = Configuration.getConfig

  def getOwnerId: String = config.getString("app.blog.ownerId")
}

object BlogConfiguration {
  private val config = BlogConfigurationImpl()

  def getOwnerId: String = config.getOwnerId
}
