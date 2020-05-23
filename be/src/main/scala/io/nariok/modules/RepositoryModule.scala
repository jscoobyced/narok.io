package io.nariok.modules

import com.google.inject.AbstractModule
import io.nariok.repositories.DatabaseRepository
import io.nariok.repositories.mysql.MysqlRepository
import net.codingwell.scalaguice.ScalaModule

class RepositoryModule() extends AbstractModule with ScalaModule {
  override def configure(): Unit =
    bind[DatabaseRepository].to[MysqlRepository].in[com.google.inject.Singleton]

}
