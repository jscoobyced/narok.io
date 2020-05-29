package io.narok.models.blog

case class BlogContent(id: Int,
                       value: String,
                       contentType: String,
                       blogId: Int,
                       status: Int,
                       altText: Option[String] = None,
                       align: Option[String] = None)
