import { shallow } from 'enzyme';
import * as React from 'react';
import { IArticle } from '../../models/blog/Article';
import { BlogContent } from './BlogContent';
import { getText } from '../jestUtil';

describe('BlogContent', () => {
  const article: IArticle = {
    title: 'title',
    contents: ['content'],
    created: 'created',
    modified: 'modified',
  };
  it('should render content', () => {
    const blogContent = shallow(<BlogContent article={article} />);
    expect(blogContent.find('article')).toHaveLength(1);
    expect(getText(blogContent, '.article__title')).toEqual(article.title);
    expect(getText(blogContent, '.article__content')).toEqual(article.contents[0]);
    expect(getText(blogContent, '.article__created')).toEqual(article.created);
    expect(getText(blogContent, '.article__modified')).toEqual('');
  });
});
