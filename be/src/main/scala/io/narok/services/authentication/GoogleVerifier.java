package io.narok.services.authentication;

import io.narok.models.User;

public interface GoogleVerifier {
  User verify(String token);
}
