import { shallow } from 'enzyme';
import * as React from 'react';
import {
  IArticle, toContentText, IContentText, IContent, toContentImage, IContentImage,
} from '../../models/blog/Article';
import { BlogContent } from './BlogContent';
import { getText } from '../jestUtil';

describe('BlogContent', () => {
  const textContent: IContentText = toContentText('content');
  const imageContent: IContentImage = toContentImage('url');
  const baseArticle: IArticle = {
    id: 0,
    title: 'title',
    contents: [textContent, imageContent],
    created: 'created',
    modified: 'modified',
  };

  it('should render text content', () => {
    const article = { ...baseArticle };
    const blogContent = shallow(<BlogContent article={article} />);
    expect(blogContent.find('article')).toHaveLength(1);
    expect(getText(blogContent, '.article__title')).toEqual(article.title);
    expect(getText(blogContent, '.article__content')).toEqual(textContent.text);
    expect(blogContent.find('.article__image img')).toBeDefined();
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
