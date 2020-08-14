package io.narok.services.authentication

import io.narok.models.User

class GoogleServiceMock extends GoogleService {

  override def getUserId(token: Option[String]): String = token.getOrElse("0")
}
