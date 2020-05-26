package io.narok.models.http

case class SuccessResponse[T](data: T) extends AbstractResponse[T](data = Some(data), error = None)
