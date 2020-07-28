package io.narok.configuration

import io.narok.BaseTest

class HttpConfigurationSpec extends BaseTest {

  describe("HttpConfiguration") {
    it("should load the default values") {
      val origin    = HttpConfigurationImpl.getOrigin
      val interface = HttpConfigurationImpl.getInterface
      val port      = HttpConfigurationImpl.getPort
      assert(origin == "test")
      assert(interface == "0.0.0.0")
      assert(port == 9999)
    }
  }
}
