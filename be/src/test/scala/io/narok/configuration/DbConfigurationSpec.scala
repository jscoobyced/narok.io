package io.narok.configuration

import io.narok.BaseTest

object DbConfigurationTest {
  private val config      = DbConfigurationImpl(Some("test.conf"))
  def getUrl: String      = config.getUrl
  def getUsername: String = config.getUsername
  def getPassword: String = config.getPassword
}

class DbConfigurationSpec extends BaseTest {

  describe("DbConfiguration") {
    it("should load the default values") {
      val password = DbConfigurationTest.getPassword
      val username = DbConfigurationTest.getUsername
      val url      = DbConfigurationTest.getUrl
      assert(password == "test")
      assert(username == "test")
      assert(url == "test")
    }
  }
}
