package io.narok.models

// $COVERAGE-OFF$
object ErrorCode extends Enumeration {
  type ErrorCode = Int

  val Unhandled     = 10
  val CannotGet     = 100
  val CannotSave    = 101
  val WrongDataType = 200
}
// $COVERAGE-ON$
