package io.narok

import scala.concurrent.Await
import scala.concurrent.duration._

class StarterSpec extends BaseTest {

  describe("Starter") {
    it("should start and binds on port 9999") {
      val serverBinding = Await.result(injector.getInstance(classOf[Starter]).start(), 10.seconds)
      assert(serverBinding.localAddress.getPort == 9999)
      Await.result(serverBinding.unbind(), 10.seconds)
    }
  }
}
