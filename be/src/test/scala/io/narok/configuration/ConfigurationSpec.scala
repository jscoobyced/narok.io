package io.narok.configuration

import io.narok.BaseTest

class ConfigurationSpec extends BaseTest {
  describe("A Configuration") {
    it("should be loaded") {
      assert(!Configuration.getConfig("test.conf").isEmpty)
    }
    it("should support all data types") {
      val config = Configuration.getConfig("test.conf")
      assert(config.getString("app.test.string") == "string")
      assert(config.getInt("app.test.number") == 1)
      assert(config.getBoolean("app.test.boolean"))
    }
  }
}
