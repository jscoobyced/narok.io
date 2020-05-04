import * as React from 'react';
import { IArticle } from '../../models/blog/Article';
import './BlogContent.scss';

export const BlogContent = (props: { article: IArticle }) => {
  const { article } = props;
  const { title, contents, created } = article;
  let key = 0;
  const allContent = contents.map(content => {
    key += 1;
    return <span key={`bp-ac-${key}`} className="article__content">{content}</span>;
  });

  return (
    <article>
      <h2 className="article__title">{title}</h2>
      <span className="article__created">{created}</span>
      {allContent}
      <span className="article__separator">
        <img alt="Separator" title="Small thorn" src="images/thorn-horizontal-small.png" />
      </span>
    </article>
  );
};
