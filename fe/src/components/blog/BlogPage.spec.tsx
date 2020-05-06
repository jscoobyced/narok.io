import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { BlogPage } from './BlogPage';
import { mountComponent } from '../jestUtil';
import { Article, toArticle } from '../../models/blog/Article';

describe('BlogPage', () => {
  it('should render articles', async () => {
    let blogPage = mount(<></>);
    const articles: Article[] = [toArticle(1, 'test', [], 'created')];
    await act(async () => {
      blogPage = mountComponent(<BlogPage />, () => { }, articles);
    });
    expect(blogPage).not.toBeUndefined();
    blogPage.update();
    expect(blogPage.find('article')).toHaveLength(1);
  });

  it('should render empty articles', async () => {
    let blogPage = mount(<></>);
    await act(async () => {
      blogPage = mountComponent(<BlogPage />, () => { });
    });
    expect(blogPage).not.toBeUndefined();
    blogPage.update();
    expect(blogPage.find('article')).toHaveLength(0);
  });
});
