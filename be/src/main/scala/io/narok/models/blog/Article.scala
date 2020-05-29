package io.narok.models.blog

final case class Article(id: Int,
                         title: String,
                         contents: List[BlogContent],
                         created: String,
                         modified: String,
                         status: Int) {
  def addContent(blogContent: BlogContent): Article =
    Article(id, title, contents :+ blogContent, created, modified, status)
}
