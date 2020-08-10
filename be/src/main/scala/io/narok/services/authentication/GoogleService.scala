package io.narok.services.authentication

import io.narok.models.{EmptyUser, User}

trait GoogleService {
  def getUser(token: String): User
}

class GoogleServiceImpl extends GoogleService {
  override def getUser(token: String): User = EmptyUser()
}
