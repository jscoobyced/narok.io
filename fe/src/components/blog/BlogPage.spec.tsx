import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { BlogPage } from './BlogPage';
import { mountComponent } from '../jestUtil';
import { Article, toArticle } from '../../models/blog/Article';
import { User } from '../../models/User';

const owner: User = { id: '12345678', name: 'Administrator' };

describe('BlogPage', () => {
  it('should render articles', async () => {
    let blogPage = mount(<></>);
    const articles: Article[] = [
      toArticle(1, owner, 'test', [], 'created'),
      toArticle(2, owner, 'test', [], 'created')];
    await act(async () => {
      blogPage = mountComponent(<BlogPage />, () => { }, articles);
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
});
