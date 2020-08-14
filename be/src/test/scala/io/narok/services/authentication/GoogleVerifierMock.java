package io.narok.services.authentication;

import io.narok.models.User;

public class GoogleVerifierMock  implements GoogleVerifier {

  private User user;

  public GoogleVerifierMock(User user) {
    this.user = user;
  }

  @Override
  public User verify(String token) {
    return this.user;
  }
}
