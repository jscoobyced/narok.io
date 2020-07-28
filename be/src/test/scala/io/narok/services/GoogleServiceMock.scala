package io.narok.services

import io.narok.models.User
import io.narok.services.blog.GoogleService

class GoogleServiceMock extends GoogleService {

  override def getUser(token: String): User = User("0", "Administrator", "token")
}
