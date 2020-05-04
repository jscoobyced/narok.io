import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { BlogPage } from './BlogPage';
import { mountComponent } from '../jestUtil';

describe('BlogPage', () => {
  it('should render articles', async () => {
    let blogPage = mount(<></>);
    await act(async () => {
      blogPage = mountComponent(<BlogPage />);
    });
    expect(blogPage).not.toBeUndefined();
    blogPage.update();
    expect(blogPage.find('article')).toHaveLength(2);
  });
});
