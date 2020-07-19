package io.narok.services.blog

import io.narok.models.{EmptyUser, User}

trait GoogleService {
  def getUser(token: String): User
}

class GoogleServiceImpl extends GoogleService {
  override def getUser(token: String): User = EmptyUser()
}
