package io.nariok.models.blog

case class BlogContent(value: String,
                       contentType: String,
                       altText: Option[String] = None,
                       align: Option[String] = None)
