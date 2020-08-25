import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { BlogPage } from './BlogPage';
import { mountComponent } from '../jestUtil';
import { ArticleData, toArticle } from '../../models/blog/ArticleData';
import { User } from '../../models/User';

const owner: User = { id: 12345678, name: 'Administrator' };

describe('BlogPage', () => {
  it('should render articles', async () => {
    let blogPage = mount(<></>);
    const articles: ArticleData[] = [
      toArticle(1, owner, 'test', [], 'created'),
      toArticle(2, owner, 'test', [], 'created')];
    const response = {
      articles,
      count: 2,
    };
    await act(async () => {
      blogPage = mountComponent(<BlogPage />, () => { }, response);
    });
    expect(blogPage).not.toBeUndefined();
    blogPage.update();
    expect(blogPage.find('article')).toHaveLength(2);
  });

  it('should render empty articles', async () => {
    let blogPage = mount(<></>);
    await act(async () => {
      blogPage = mountComponent(<BlogPage />, () => { });
    });
    expect(blogPage).not.toBeUndefined();
    blogPage.update();
    expect(blogPage.find('article')).toHaveLength(1);
  });

  it('should render pagination', async () => {
    let blogPage = mount(<></>);
    const articles: ArticleData[] = [
      toArticle(1, owner, 'test', [], 'created'),
      toArticle(2, owner, 'test', [], 'created')];
    const response = {
      articles,
      count: 10,
    };
    await act(async () => {
      blogPage = mountComponent(<BlogPage />, () => { }, response);
    });
    expect(blogPage).not.toBeUndefined();
    blogPage.update();
    expect(blogPage.find('article')).toHaveLength(3);
    const nextPageButton = blogPage.find('.input.button.article__ender').first();
    expect(nextPageButton).toBeDefined();
    nextPageButton.simulate('click');
    blogPage.update();
    const previousPageButton = blogPage.find('.input.button.article__beginner').first();
    expect(previousPageButton).toBeDefined();
    previousPageButton.simulate('click');
    blogPage.update();
  });
});
