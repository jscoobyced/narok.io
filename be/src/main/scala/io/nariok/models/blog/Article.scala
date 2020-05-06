package io.nariok.models.blog

final case class Article(id: Int, title: String, contents: List[BlogContent], created: String, modified: String)
