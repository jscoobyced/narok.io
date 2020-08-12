package io.narok.services.security

import io.narok.models.blog.{Article, BlogContent}
import org.owasp.html.{HtmlPolicyBuilder, PolicyFactory, Sanitizers}

import scala.annotation.tailrec

trait HtmlSanitizer {
  def sanitize(value: String): String
  def sanitizeArticle(article: Article): Article
  def sanitizeAllArticles(articles: List[Article]): List[Article] = articles.map(sanitizeArticle)
}

class HtmlSanitizerImpl() extends HtmlSanitizer {
  val sanitizer: PolicyFactory = createPolicy()

  private def createPolicy(): PolicyFactory =
    new HtmlPolicyBuilder()
      .allowElements("a", "i", "span", "div", "ol", "ul", "li", "br", "img", "strike")
      .allowAttributes("href", "alt", "target")
      .onElements("a")
      .allowAttributes("style")
      .onElements("span", "div", "li")
      .allowWithoutAttributes("a", "img", "span")
      .allowAttributes("src", "width", "height", "style")
      .onElements("img")
      .allowUrlProtocols("https")
      .toFactory

  override def sanitize(value: String): String = sanitizer.sanitize(value)

  override def sanitizeArticle(article: Article): Article = {
    def sanitizeBlogContent(content: BlogContent): BlogContent =
      content.copy(value = sanitize(content.value), altText = content.altText match {
        case Some(text) => Some(sanitize(text))
        case _          => None
      })

    @tailrec
    def sanitizeContents(content: List[BlogContent], result: List[BlogContent]): List[BlogContent] =
      if (content.isEmpty) result
      else sanitizeContents(content.tail, sanitizeBlogContent(content.head) :: result)

    article.copy(title = sanitize(article.title), contents = sanitizeContents(article.contents, List()))
  }
}
