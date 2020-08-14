package io.narok.models

final case class User(id: Int, name: String, email: String, referenceId: String)

object EmptyUser {
  def apply(): User = User(1, "Administrator", "test@example.org", "0")
}
