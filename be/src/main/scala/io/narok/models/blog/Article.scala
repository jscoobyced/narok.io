package io.narok.models.blog

import io.narok.models.User
import io.narok.models.http.AbstractResponse

final case class Article(id: Int,
                         owner: User,
                         title: String,
                         contents: List[BlogContent],
                         created: String,
                         modified: String,
                         status: Int) {
  def addContent(blogContent: BlogContent): Article =
    Article(id, owner, title, contents :+ blogContent, created, modified, status)
  def setOwner(newOwner: User): Article =
    Article(id, newOwner, title, contents, created, modified, status)
}

case class SuccessArticleResponse(data: List[Article]) extends AbstractResponse[List[Article]](data = Some(data))
