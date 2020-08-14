package io.narok.models

import io.narok.configuration.AuthConfiguration

final case class User(id: String, name: String)

object EmptyUser {
  def apply(): User = User("0", "Administrator")
}
