package io.nariok.models.http

case class SuccessResponse[T](data: T) extends ApiResponseModel[T](data = Some(data), error = None)
