package io.narok.models.http

abstract class AbstractResponse[T](data: Option[T] = None, error: Option[String] = None)
