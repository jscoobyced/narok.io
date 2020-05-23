package io.nariok.repositories.mappers

import java.sql.ResultSet

abstract class AbstractMapper {
  def resultSetIterator(resultSet: ResultSet): Iterator[ResultSet] =
    new Iterator[ResultSet] {
      def hasNext = resultSet.next()

      def next() = resultSet
    }
}
