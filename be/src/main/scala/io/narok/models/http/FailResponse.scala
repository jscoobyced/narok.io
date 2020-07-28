package io.narok.models.http

case class FailResponse(error: String, code: Int)
    extends AbstractResponse[Nothing](data = None, message = Some(error), code = Some(code))
