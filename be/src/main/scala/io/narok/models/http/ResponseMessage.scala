package io.narok.models.http

import io.narok.models.ErrorCode.ErrorCode
import io.narok.models.blog.Article

case class ResponseData(id: Option[Int], article: Option[Article], articles: Option[List[Article]])
case class ResponseStatus(success: Boolean, message: Option[String], errorCode: Option[ErrorCode])
case class ResponseMessage(status: ResponseStatus, responseData: Option[ResponseData])
