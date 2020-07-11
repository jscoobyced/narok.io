package io.narok.configuration

import io.narok.BaseTest

object HttpConfigurationTest {

  private val config       = Configuration.getConfig(Some("test.conf"))
  def getPort: Int         = config.getInt("app.http.port")
  def getInterface: String = config.getString("app.http.interface")
  def getOrigin: String    = config.getString("app.http.origin")

}

class HttpConfigurationSpec extends BaseTest {

  describe("HttpConfiguration") {
    it("should load the default values") {
      val origin    = HttpConfigurationTest.getOrigin
      val interface = HttpConfigurationTest.getInterface
      val port      = HttpConfigurationTest.getPort
      assert(origin == "test")
      assert(interface == "0.0.0.0")
      assert(port == 9999)
    }
  }
}
