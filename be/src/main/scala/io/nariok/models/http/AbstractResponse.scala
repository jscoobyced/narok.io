package io.nariok.models.http

abstract class ApiResponseModel[T](data: Option[T] = None, error: Option[String] = None)
