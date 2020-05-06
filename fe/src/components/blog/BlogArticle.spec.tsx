import { shallow } from 'enzyme';
import * as React from 'react';
import {
  Article, BlogContent, toBlogContentText, toBlogContentImage,
} from '../../models/blog/Article';
import { BlogArticle } from './BlogArticle';
import { getText } from '../jestUtil';

describe('BlogContent', () => {
  const textContent: BlogContent = toBlogContentText('content');
  const imageContent: BlogContent = toBlogContentImage('url');
  const baseArticle: Article = {
    id: 0,
    title: 'title',
    contents: [textContent, imageContent],
    created: 'created',
    modified: 'modified',
  };

  it('should render text content', () => {
    const article = { ...baseArticle };
    const blogContent = shallow(<BlogArticle article={article} />);
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
    const blogContent = shallow(<BlogArticle article={article} />);
    expect(blogContent.find('article')).toHaveLength(1);
  });
});
