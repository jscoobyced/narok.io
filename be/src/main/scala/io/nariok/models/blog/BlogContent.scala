package io.nariok.models.blog

case class BlogContent(id: Int,
                       value: String,
                       contentType: String,
                       blogId: Int,
                       altText: Option[String] = None,
                       align: Option[String] = None)
