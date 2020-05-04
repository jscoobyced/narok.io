import * as React from 'react';
import { IArticle, IContent } from '../../models/blog/Article';
import './BlogContent.scss';

export const BlogContent = (props: { article: IArticle }) => {
  const { article } = props;
  const {
    id, title, contents, created,
  } = article;

  const buildContent = (icontent: IContent, index: number) => {
    let result = <></>;
    switch (icontent.kind) {
      case 'text':
        result = <span key={`bp-ac-${index}`} className="article__content">{icontent.text}</span>;
        break;
      case 'image':
        result = (
          <span key={`bp-ac-${index}`} className={`article__image article__image-${icontent.align}`}>
            <img alt={icontent.altText} key={`bp-ac-img-${index}`} src={icontent.source} />
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

  return (
    <article key={`a-${id}`}>
      <h2 className="article__title">{title}</h2>
      <span className="article__created">{created}</span>
      {allContent}
      <span className="article__separator">
        <img alt="Separator" title="Small thorn" src="images/thorn-horizontal-small.png" />
      </span>
    </article>
  );
};
