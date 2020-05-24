package io.nariok.modules

import com.google.inject.AbstractModule
import io.nariok.repositories.{DatabaseRepository, SqlConnectionCreator, SqlConnectionCreatorImpl}
import io.nariok.repositories.mysql.MysqlRepository
import net.codingwell.scalaguice.ScalaModule

class RepositoryModule() extends AbstractModule with ScalaModule {
  override def configure(): Unit = {
    bind[SqlConnectionCreator].to[SqlConnectionCreatorImpl].in[com.google.inject.Singleton]
    bind[DatabaseRepository].to[MysqlRepository].in[com.google.inject.Singleton]
  }

}
