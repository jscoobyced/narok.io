import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { EditableBlogContent } from './EditableBlogContent';
import { BlogContent, toBlogContentText } from '../../models/blog/ArticleData';
import { defaultButtonText } from '../editor/SimpleEditor/SimpleEditor';

describe('EditableBlogContent', () => {
  it('should render the default UI', () => {
    const htmlTextContent = '<i>text content</i>';
    const content: BlogContent = toBlogContentText(htmlTextContent);
    const onContentChange = jest.fn();
    const removeBlogContent = jest.fn();

    const wrapper = shallow(<EditableBlogContent
      content={content}
      buttonText={defaultButtonText}
      onContentChange={onContentChange}
      removeText=""
      removeBlogContent={removeBlogContent}
    />);
    const editor = wrapper.find('.article__content-editing');
    const html = editor.render().html();
    expect(html).toEqual(htmlTextContent);
    editor.simulate('blur');
    expect(onContentChange).toHaveBeenCalledTimes(1);
  });

  it('should remove the blog content when button is clicked', () => {
    const htmlTextContent = '<i>text content</i>';
    const content: BlogContent = toBlogContentText(htmlTextContent);
    const onContentChange = jest.fn();
    const removeBlogContent = jest.fn();

    const wrapper = mount(<EditableBlogContent
      content={content}
      buttonText={defaultButtonText}
      onContentChange={onContentChange}
      removeText=""
      removeBlogContent={removeBlogContent}
    />);
    const removeButton = wrapper.find('.input.button.article__ender');
    removeButton.simulate('click');
    expect(removeBlogContent).toHaveBeenCalledTimes(1);
  });
});
