package io.narok.models

object ErrorCode extends Enumeration {
  type ErrorCode = Int

  val Unhandled     = 10
  val CannotSave    = 100
  val WrongDataType = 200
}
