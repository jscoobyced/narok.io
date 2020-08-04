package io.narok.models

import io.narok.configuration.BlogConfiguration

final case class User(id: String, name: String, token: String)

object EmptyUser {
  def apply(): User = User(BlogConfiguration.getOwnerId, "Administrator", "0")
}
