package io.narok.models

// $COVERAGE-OFF$
object ErrorCode extends Enumeration {
  type ErrorCode = Int

  val Unhandled     = 10
  val CannotSave    = 100
  val WrongDataType = 200
}
// $COVERAGE-ON$
