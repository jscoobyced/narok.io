package io.narok.services.security

import io.narok.models.blog.Article

trait HtmlSanitizer {
  def sanitize(article: Article): Article
  def sanitizeAll(articles: List[Article]): List[Article] = articles.map(sanitize)
}

class HtmlSanitizerImpl() extends HtmlSanitizer {
  override def sanitize(article: Article): Article = article
}
