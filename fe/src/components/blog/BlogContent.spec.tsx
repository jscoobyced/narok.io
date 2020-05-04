import { shallow } from 'enzyme';
import * as React from 'react';
import {
  IArticle, toContentText, IContentText, IContent,
} from '../../models/blog/Article';
import { BlogContent } from './BlogContent';
import { getText } from '../jestUtil';

describe('BlogContent', () => {
  const content: IContentText = toContentText('content');
  const baseArticle: IArticle = {
    id: 0,
    title: 'title',
    contents: [content],
    created: 'created',
    modified: 'modified',
  };

  it('should render content', () => {
    const article = { ...baseArticle };
    const blogContent = shallow(<BlogContent article={article} />);
    expect(blogContent.find('article')).toHaveLength(1);
    expect(getText(blogContent, '.article__title')).toEqual(article.title);
    expect(getText(blogContent, '.article__content')).toEqual(content.text);
    expect(getText(blogContent, '.article__created')).toEqual(article.created);
    expect(getText(blogContent, '.article__modified')).toEqual('');
  });

  it('should not fail if type of content is unkown', () => {
    const article = { ...baseArticle };
    article.contents = [{} as IContent];
    const blogContent = shallow(<BlogContent article={article} />);
    expect(blogContent.find('article')).toHaveLength(1);
  });
});
