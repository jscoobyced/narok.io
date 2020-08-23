package io.narok.repositories.mappers

import java.sql.ResultSet

// $COVERAGE-OFF$
object SimpleMapper {

  def toInt(resultSet: ResultSet): Option[Int] = {
    resultSet.next()
    Some(resultSet.getInt(1))
  }
}
// $COVERAGE-ON$
