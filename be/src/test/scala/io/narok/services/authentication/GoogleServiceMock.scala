package io.narok.services.authentication

import io.narok.models.User

class GoogleServiceMock extends GoogleService {

  override def getUser(token: String): User = User("0", "Administrator", "token")
}
