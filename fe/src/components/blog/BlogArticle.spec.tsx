import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  Article, BlogContent, toBlogContentText, toBlogContentImage, Align,
} from '../../models/blog/Article';
import { BlogArticle } from './BlogArticle';
import { getText, mountComponent } from '../jestUtil';
import { User } from '../../models/User';

describe('BlogContent', () => {
  const textContent: BlogContent = toBlogContentText('content', Align.Center, '', 1);
  const imageContent: BlogContent = toBlogContentImage('url');
  const owner: User = { id: '12345678', name: 'Administrator' };
  const baseArticle: Article = {
    id: 1,
    owner,
    title: 'title',
    contents: [textContent, imageContent],
    created: 'created',
    modified: 'modified',
  };
  const editText = 'Edit';
  const saveText = 'Save';
  const testData = [
    {
      hasEditPermission: false, isEditing: false, length: 1, editButtonLength: 0, saveButtonLength: 0,
    },
    {
      hasEditPermission: false, isEditing: true, length: 1, editButtonLength: 0, saveButtonLength: 0,
    },
    {
      hasEditPermission: true, isEditing: false, length: 1, editButtonLength: 1, saveButtonLength: 0,
    },
    {
      hasEditPermission: true, isEditing: true, length: 1, editButtonLength: 0, saveButtonLength: 1,
    },
  ];

  testData.forEach((data) => {
    it(`should render text content with {${data.hasEditPermission}, ${data.isEditing}}`, () => {
      const article = { ...baseArticle };
      const blogContent = mountComponent(
        <BlogArticle
          article={article}
          fromText="By"
          editText={editText}
          saveText={saveText}
          hasEditPermission={data.hasEditPermission}
          isEditing={data.isEditing}
        />,
        () => { },
        article,
      );
      expect(blogContent.find('article')).toHaveLength(data.length);
      expect(getText(blogContent, '.article__title')).toEqual(article.title);
      expect(getText(blogContent, '.article__content')).toEqual(textContent.value);
      expect(blogContent.find('.article__image img')).toBeDefined();
      expect(getText(blogContent, '.article__created')).toEqual(article.created);
      expect(getText(blogContent, '.article__modified')).toEqual('');
      const editButton = blogContent
        .find('a.button')
        .findWhere(element => element !== null && element.text() === editText);
      expect(editButton.first()).toHaveLength(data.editButtonLength);
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText);
      expect(saveButton.first()).toHaveLength(data.saveButtonLength);
    });
  });

  it('should update an article', async () => {
    const article = { ...baseArticle };
    const result = { id: 1, message: 'Complete.' };
    let blogContent = mount(<></>);
    await act(async () => {
      blogContent = mountComponent(
        <BlogArticle
          article={article}
          fromText="By"
          editText={editText}
          saveText={saveText}
          hasEditPermission
          isEditing
        />,
        () => { },
        result,
      );
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText)
        .first();
      saveButton.simulate('click');
    });
  });

  it('should show a message when can\'t update an article', async () => {
    const article = { ...baseArticle };
    const result = { id: 2, message: '' };
    await act(async () => {
      const blogContent = mountComponent(
        <BlogArticle
          article={article}
          fromText="By"
          editText={editText}
          saveText={saveText}
          hasEditPermission
          isEditing
        />,
        () => { },
        result,
      );
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText)
        .first();
      saveButton.simulate('click');
    });
  });

  it('should save an article', async () => {
    const article = { ...baseArticle };
    article.id = 0;
    const result = { id: 1, message: '' };
    await act(async () => {
      const blogContent = mountComponent(
        <BlogArticle
          article={article}
          fromText="By"
          editText={editText}
          saveText={saveText}
          hasEditPermission
          isEditing
        />,
        () => { },
        result,
      );
      const bgContent = blogContent
        .find(`#bg-${textContent.id}`)
        .first();
      bgContent.simulate('blur');
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText)
        .first();
      saveButton.simulate('click');
    });
  });

  it('should show a message when can\'t save an article', async () => {
    const article = { ...baseArticle };
    article.id = 0;
    const result = { id: 0, message: '' };
    await act(async () => {
      const blogContent = mountComponent(
        <BlogArticle
          article={article}
          fromText="By"
          editText={editText}
          saveText={saveText}
          hasEditPermission
          isEditing
        />,
        () => { },
        result,
      );
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText)
        .first();
      saveButton.simulate('click');
    });
  });

  it('should not fail if type of content is unkown', () => {
    const article = { ...baseArticle };
    article.contents = [{} as BlogContent];
    const blogContent = mountComponent(<BlogArticle
      article={article}
      fromText="By"
      editText={editText}
      saveText={saveText}
      hasEditPermission={false}
      isEditing={false}
    />);
    expect(blogContent.find('article')).toHaveLength(1);
  });
});
