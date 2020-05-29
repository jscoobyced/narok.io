package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.repositories.db.{
  DatabaseRepository,
  DatabaseRepositoryImpl,
  SqlConnectionCreator,
  SqlConnectionCreatorImpl
}
import net.codingwell.scalaguice.ScalaModule

class RepositoryModule() extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    bind[SqlConnectionCreator].to[SqlConnectionCreatorImpl].in[com.google.inject.Singleton]
    bind[DatabaseRepository].to[DatabaseRepositoryImpl].in[com.google.inject.Singleton]
  }

}
