package io.narok.modules

import com.google.inject.AbstractModule
import io.narok.repositories.{DatabaseRepository, SqlConnectionCreator, SqlConnectionCreatorImpl}
import io.narok.repositories.mysql.MysqlRepository
import net.codingwell.scalaguice.ScalaModule

class RepositoryModule() extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    bind[SqlConnectionCreator].to[SqlConnectionCreatorImpl].in[com.google.inject.Singleton]
    bind[DatabaseRepository].to[MysqlRepository].in[com.google.inject.Singleton]
  }

}
