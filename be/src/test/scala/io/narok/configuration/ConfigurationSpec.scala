package io.narok.configuration

import io.narok.BaseTest

class ConfigurationSpec extends BaseTest {
  describe("A Configuration") {
    it("should be loaded") {
      assert(!Configuration.getConfig.isEmpty)
    }
    it("should support all data types") {
      val config = Configuration.getConfig
      assert(config.getString("test.string") == "string")
      assert(config.getInt("test.number") == 1)
      assert(config.getBoolean("test.boolean"))
    }
  }
}
