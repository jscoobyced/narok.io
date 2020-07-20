package io.narok.models.http

abstract class AbstractResponse[T](data: Option[T] = None, message: Option[String] = None, code: Option[Int] = None)
