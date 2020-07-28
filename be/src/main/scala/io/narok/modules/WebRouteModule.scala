package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.routes.{BlogRoute, WebRoute}
import net.codingwell.scalaguice.{ScalaModule, ScalaMultibinder}

class WebRouteModule extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    val routesMultiBinding = ScalaMultibinder.newSetBinder[WebRoute](binder)
    routesMultiBinding.addBinding.to[BlogRoute]
    ()
  }
}
