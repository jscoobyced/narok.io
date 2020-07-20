package io.narok.configuration

import io.narok.BaseTest

class BlogConfigurationSpec extends BaseTest {

  describe("BlogConfigurationSpec") {
    it("should load the default values") {
      val ownerId = BlogConfiguration.getOwnerId
      assert(ownerId == "0")
    }
  }
}
