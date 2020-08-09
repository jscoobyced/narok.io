import * as React from 'react';
import { shallow } from 'enzyme';
import { StaticBlogContent } from './StaticBlogContent';
import { toBlogContentText, BlogContent } from '../../models/blog/ArticleData';

describe('StaticBlogContent', () => {
  it('should render text UI', () => {
    const htmlTextContent = '<i>text content</i>';
    const content: BlogContent = toBlogContentText(htmlTextContent);
    const wrapper = shallow(<StaticBlogContent
      content={content}
    />);
    const html = wrapper.render().html();
    expect(html).toEqual(htmlTextContent);
  });
});
