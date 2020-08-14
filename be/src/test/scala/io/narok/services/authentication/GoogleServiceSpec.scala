package io.narok.services.authentication

import io.narok.BaseTest
import io.narok.models.User

class GoogleServiceSpec extends BaseTest {

  describe("A GoogleService") {

    it("should be able to get User") {
      val testUser      = User(123, "Name", "", "123")
      val googleService = new GoogleServiceImpl(new GoogleVerifierMock(testUser))
      assert(googleService.getUserId(Some("Bearer some random stuff")) == testUser.referenceId)
    }

    it("should not find a User if token is invalid") {
      val testUser      = User(123, "Name", "", "123")
      val googleService = new GoogleServiceImpl(new GoogleVerifierMock(testUser))
      assert(googleService.getUserId(Some("Some random stuff")) == "")
    }
  }
}
