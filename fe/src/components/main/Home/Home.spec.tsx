import { mount } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import HttpServiceMock from '../../../services/http/http.mock';
import { Home } from './Home';
import { mountComponent } from '../../jestUtil';
import { Article, toArticle } from '../../../models/blog/Article';
import { User } from '../../../models/User';

const owner: User = { id: '12345678', name: 'Administrator' };

describe('Home', () => {
  it('should display all elements.', async () => {
    let home = mount(<></>);
    const articles: Article[] = [toArticle(1, owner, 'test', [], 'created')];
    const httpService = new HttpServiceMock(articles);
    await act(async () => {
      home = mountComponent(<Home httpService={httpService} mode="development" />);
    });
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
  });

  it('should display all elements when no data.', async () => {
    let home = mount(<></>);
    const httpService = new HttpServiceMock({});
    await act(async () => {
      home = mountComponent(<Home httpService={httpService} mode="development" />);
    });
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
  });
});
