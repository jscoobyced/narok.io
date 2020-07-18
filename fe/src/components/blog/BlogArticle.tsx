import * as React from 'react';
import { Link } from 'react-router-dom';
import { Article, BlogContent, BlogContentType } from '../../models/blog/Article';
import './BlogArticle.scss';

export const BlogArticle = (props: { article: Article, fromText: string, editText: string, canEdit: boolean }) => {
  const {
    article, fromText, editText, canEdit,
  } = props;
  const {
    id, owner, title, contents, created,
  } = article;
  const { name } = owner;

  const buildContent = (icontent: BlogContent, index: number) => {
    let result = <span key={`bp-ac-${index}`} />;
    switch (icontent.contentType) {
      case BlogContentType.Text:
        result = <span key={`bp-ac-${index}`} className="article__content">{icontent.value}</span>;
        break;
      case BlogContentType.Image:
        result = (
          <span key={`bp-ac-${index}`} className={`article__image article__image-${icontent.align}`}>
            <img alt={icontent.altText} key={`bp-ac-img-${index}`} src={icontent.value} />
          </span>
        );
        break;
      default:
        break;
    }
    return result;
  };

  let key = 0;
  const allContent = contents.map(content => {
    key += 1;
    return buildContent(content, key);
  });

  const editButton = (
    <Link to={`/article/${id}`} className="button article__ender">
      <span>{editText}</span>
    </Link>
  );

  return (
    <article key={`a-${id}`}>
      <h2 className="article__title">{title}</h2>
      <span className="article__created">{created}</span>
      {allContent}
      <span className="article__ender">
        {fromText}
        {' '}
        {name}
      </span>
      {canEdit && editButton}
      <span className="article__separator" />
    </article>
  );
};
