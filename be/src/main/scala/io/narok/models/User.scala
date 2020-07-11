package io.narok.models

final case class User(id: String, name: String, givenName: String, familyName: String, imageUrl: String, email: String)

object EmptyUser {
  def apply(): User = User("123456789", "Administrator", "Cedric", "Rochefolle", "", "")
}
