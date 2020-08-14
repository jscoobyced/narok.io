package io.narok.services.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import io.narok.configuration.AuthConfiguration;
import io.narok.models.User;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

// $COVERAGE-OFF$
public class GoogleVerifierImpl implements GoogleVerifier {
  private GoogleIdTokenVerifier verifier;

  public User verify(String token) {
    User user = new User(0, "", "", "");
    if (token.isBlank()) return user;

    try {
      GoogleIdToken idToken = this.getVerifier().verify(token);
      Payload payload = idToken.getPayload();
      user = new User(0, payload.get("name").toString(), payload.getEmail(), payload.getSubject());
    } catch (IOException ioe) {
      // Skip for now
    } catch (GeneralSecurityException gse) {
      // Skip for now
    } catch (Exception e) {
      // Skip for now
    }
    return user;
  }

  private GoogleIdTokenVerifier getVerifier() {
    if (this.verifier == null) {
      this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
        .setAudience(Collections.singletonList(AuthConfiguration.getClientId()))
        .setIssuer("accounts.google.com")
        .build();
    }
    return this.verifier;
  }

}
// $COVERAGE-ON$
