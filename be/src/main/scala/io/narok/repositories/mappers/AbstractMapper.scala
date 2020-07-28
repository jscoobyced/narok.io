package io.narok.repositories.mappers

import java.sql.ResultSet

// $COVERAGE-OFF$
abstract class AbstractMapper {
  def resultSetIterator(resultSet: ResultSet): Iterator[ResultSet] =
    new Iterator[ResultSet] {
      def hasNext: Boolean = resultSet.next()

      def next(): ResultSet = resultSet
    }
}
// $COVERAGE-ON$
