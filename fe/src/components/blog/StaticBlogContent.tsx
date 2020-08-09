import * as React from 'react';
import { BlogContent } from '../../models/blog/ArticleData';

interface MyProps {
  content: BlogContent
}

export const StaticBlogContent = (props: MyProps) => {
  const { content } = props;
  const { id, value } = content;
  return (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: value }}
      className="article__content"
    />
  );
};
