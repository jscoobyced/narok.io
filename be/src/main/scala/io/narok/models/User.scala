package io.narok.models

final case class User(id: String, name: String, token: String)

object EmptyUser {
  def apply(): User = User("123456789", "Administrator", "0")
}
