package io.nariok.models.http

case class FailResponse(error: String) extends ApiResponseModel[Nothing](data = None, error = Some(error))
