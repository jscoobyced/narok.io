import { shallow } from 'enzyme';
import * as React from 'react';
import {
  Article, BlogContent, toBlogContentText, toBlogContentImage,
} from '../../models/blog/Article';
import { BlogArticle } from './BlogArticle';
import { getText } from '../jestUtil';
import { User } from '../../models/User';

describe('BlogContent', () => {
  const textContent: BlogContent = toBlogContentText('content');
  const imageContent: BlogContent = toBlogContentImage('url');
  const owner: User = { id: '12345678', name: 'Administrator' };
  const baseArticle: Article = {
    id: 0,
    owner,
    title: 'title',
    contents: [textContent, imageContent],
    created: 'created',
    modified: 'modified',
  };

  it('should render text content', () => {
    const article = { ...baseArticle };
    const blogContent = shallow(<BlogArticle article={article} fromOwner="By" />);
    expect(blogContent.find('article')).toHaveLength(1);
    expect(getText(blogContent, '.article__title')).toEqual(article.title);
    expect(getText(blogContent, '.article__content')).toEqual(textContent.value);
    expect(blogContent.find('.article__image img')).toBeDefined();
    expect(getText(blogContent, '.article__created')).toEqual(article.created);
    expect(getText(blogContent, '.article__modified')).toEqual('');
  });

  it('should not fail if type of content is unkown', () => {
    const article = { ...baseArticle };
    article.contents = [{} as BlogContent];
    const blogContent = shallow(<BlogArticle article={article} fromOwner="By" />);
    expect(blogContent.find('article')).toHaveLength(1);
  });
});
