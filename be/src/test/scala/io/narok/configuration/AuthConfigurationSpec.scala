package io.narok.configuration

import io.narok.BaseTest

class AuthConfigurationSpec extends BaseTest {

  describe("BlogConfigurationSpec") {
    it("should load the default values") {
      val ownerId = AuthConfiguration.getOwnerId
      assert(ownerId == "0")
      val clientId = AuthConfiguration.getClientId
      assert(clientId == "123456789")
    }
  }
}
