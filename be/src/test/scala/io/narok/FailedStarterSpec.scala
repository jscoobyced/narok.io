package io.narok

import java.sql.DriverManager

import scala.concurrent.Await
import scala.concurrent.duration._

class FailedStarterSpec extends BaseTest {

  describe("Starter") {
    it("Failure to bind should still return the bindings") {
      assertThrows[Exception]({
        val serverBinding = Await.result(injector.getInstance(classOf[Starter]).start(), 10.seconds)
        Await.result(serverBinding.unbind(), 10.seconds)
      })
    }
  }

  override protected def configuration: String = "failed.conf"

}
