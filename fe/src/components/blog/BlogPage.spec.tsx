import * as React from 'react';
import { BlogPage } from './BlogPage';
import { mountComponent } from '../jestUtil';

describe('BlogPage', () => {
  it('should render', () => {
    const blogPage = mountComponent(<BlogPage />);
    expect(blogPage.find('div')).toHaveLength(1);
  });
});
