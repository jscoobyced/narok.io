package io.narok

import com.google.inject.util.Modules
import com.google.inject.{AbstractModule, Guice, Injector}
import io.narok.modules.ApplicationModule
import net.codingwell.scalaguice.ScalaModule

class FullBaseTest extends BaseTest {
  protected val injector: Injector =
    Guice.createInjector(
      Modules
        .`override`(new ApplicationModule())
        .`with`(overriding())
    )
  protected def overriding(): ScalaModule = new AbstractModule with ScalaModule
}
