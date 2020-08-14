package io.narok.configuration

import io.narok.BaseTest

class AuthConfigurationSpec extends BaseTest {

  describe("BlogConfigurationSpec") {
    it("should load the default values") {
      val ownerIds = AuthConfiguration.getOwnerIds
      assert(ownerIds.contains("0"))
      val clientId = AuthConfiguration.getClientId
      assert(clientId == "123456789")
    }
  }
}
