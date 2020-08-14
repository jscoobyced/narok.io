package io.narok.services.authentication

import com.google.inject.Inject

trait GoogleService {
  def getUserId(token: Option[String]): String
}

class GoogleServiceImpl @Inject()(val googleVerifier: GoogleVerifier) extends GoogleService {
  private val bearer = "Bearer "
  override def getUserId(token: Option[String]): String = {
    def getToken(fullToken: Option[String]): String = {
      val actualToken = fullToken match {
        case Some(value: String) if value.contains(bearer) => value.substring(bearer.length)
        case _                                             => ""
      }
      actualToken
    }

    def getVerifiedUserId(actualToken: String) =
      if (actualToken.isBlank) ""
      else {
        googleVerifier.verify(actualToken).id
      }
    getVerifiedUserId(getToken(token))
  }
}
