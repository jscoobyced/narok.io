import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { ArticlePage } from './ArticlePage';
import { mountComponent } from '../jestUtil';
import { Article, toArticle } from '../../models/blog/Article';
import { User } from '../../models/User';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    articleId: '1',
  }),
}));

const owner: User = { id: '12345678', name: 'Administrator' };

describe('ArticlePage', () => {
  it('should render the article', async () => {
    let articlePage = mount(<></>);
    const articles: Article = toArticle(1, owner, 'test', [], 'created');
    await act(async () => {
      articlePage = mountComponent(<ArticlePage />, () => { }, articles);
    });
    expect(articlePage).not.toBeUndefined();
    articlePage.update();
    expect(articlePage.find('article')).toHaveLength(1);
  });

  it('should render empty articles', async () => {
    let articlePage = mount(<></>);
    await act(async () => {
      articlePage = mountComponent(<ArticlePage />, () => { });
    });
    expect(articlePage).not.toBeUndefined();
    articlePage.update();
    expect(articlePage.find('article')).toHaveLength(1);
  });
});
