package io.narok.repositories.mappers

import java.sql.ResultSet

abstract class AbstractMapper {
  def resultSetIterator(resultSet: ResultSet): Iterator[ResultSet] =
    new Iterator[ResultSet] {
      def hasNext: Boolean = resultSet.next()

      def next(): ResultSet = resultSet
    }
}
