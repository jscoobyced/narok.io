package io.narok.models.blog

sealed trait BlogContentType

case object BlogText extends BlogContentType

case object BlogImage extends BlogContentType
