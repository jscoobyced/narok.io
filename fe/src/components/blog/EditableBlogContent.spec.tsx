import * as React from 'react';
import { shallow } from 'enzyme';
import { EditableBlogContent } from './EditableBlogContent';
import { BlogContent, toBlogContentText } from '../../models/blog/ArticleData';
import { defaultButtonText } from '../editor/SimpleEditor/SimpleEditor';

describe('EditableBlogContent', () => {
  it('should render the default UI', () => {
    const htmlTextContent = '<i>text content</i>';
    const content: BlogContent = toBlogContentText(htmlTextContent);
    const onContentChange = jest.fn();

    const wrapper = shallow(<EditableBlogContent
      content={content}
      buttonText={defaultButtonText}
      onContentChange={onContentChange}
    />);
    const editor = wrapper.find('.article__content-editing');
    const html = editor.render().html();
    expect(html).toEqual(htmlTextContent);
    editor.simulate('blur');
    expect(onContentChange).toHaveBeenCalledTimes(1);
  });
});
