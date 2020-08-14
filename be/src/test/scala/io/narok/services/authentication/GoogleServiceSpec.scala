package io.narok.services.authentication

import io.narok.BaseTest
import io.narok.models.User

class GoogleServiceSpec extends BaseTest {

  describe("A GoogleService") {

    it("should be able to get User") {
      val testUser      = new User("123", "Name")
      val googleService = new GoogleServiceImpl(new GoogleVerifierMock(testUser))
      assert(googleService.getUserId(Some("Bearer some random stuff")) == testUser.id)
    }
  }
}