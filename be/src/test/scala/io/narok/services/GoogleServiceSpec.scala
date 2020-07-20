package io.narok.services

import io.narok.BaseTest
import io.narok.models.EmptyUser
import io.narok.services.blog.GoogleServiceImpl

class GoogleServiceSpec extends BaseTest {

  describe("A GoogleService") {

    it("should be able to get User") {
      val emptyUser     = EmptyUser()
      val googleService = new GoogleServiceImpl()
      assert(googleService.getUser("").id == emptyUser.id)
    }
  }
}
