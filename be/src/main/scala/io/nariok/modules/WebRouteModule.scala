package io.nariok.modules

import com.google.inject.AbstractModule
import io.nariok.routes.{BlogRoute, WebRoute}
import net.codingwell.scalaguice.{ScalaModule, ScalaMultibinder}

class WebRouteModule extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    val routesMultiBinding = ScalaMultibinder.newSetBinder[WebRoute](binder)
    routesMultiBinding.addBinding.to[BlogRoute]
    ()
  }
}
