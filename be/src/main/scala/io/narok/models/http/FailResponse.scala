package io.narok.models.http

case class FailResponse(error: String) extends AbstractResponse[Nothing](data = None, error = Some(error))
