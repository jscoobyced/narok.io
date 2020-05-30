package io.narok.configuration

import io.narok.BaseTest

class RawConfigurationSpec extends BaseTest {

  describe("A RawConfiguration") {
    it("should not be empty") {
      assert(!RawConfiguration(Configuration.getConfig).config.isEmpty)
    }
  }
}
