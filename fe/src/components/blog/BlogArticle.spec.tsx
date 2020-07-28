import { shallow } from 'enzyme';
import * as React from 'react';
import {
  Article, BlogContent, toBlogContentText, toBlogContentImage,
} from '../../models/blog/Article';
import { BlogArticle } from './BlogArticle';
import { getText, mountComponent } from '../jestUtil';
import { User } from '../../models/User';

describe('BlogContent', () => {
  const textContent: BlogContent = toBlogContentText('content');
  const imageContent: BlogContent = toBlogContentImage('url');
  const owner: User = { id: '12345678', name: 'Administrator' };
  const baseArticle: Article = {
    id: 0,
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
      );
      expect(blogContent.find('article')).toHaveLength(data.length);
      expect(getText(blogContent, '.article__title')).toEqual(article.title);
      expect(getText(blogContent, '.article__content')).toEqual(textContent.value);
      expect(blogContent.find('.article__image img')).toBeDefined();
      expect(getText(blogContent, '.article__created')).toEqual(article.created);
      expect(getText(blogContent, '.article__modified')).toEqual('');
      const editButton = blogContent
        .find('a.button span')
        .findWhere(element => element !== null && element.text() === editText);
      expect(editButton.first()).toHaveLength(data.editButtonLength);
      const saveButton = blogContent
        .find('a.button span')
        .findWhere(element => element !== null && element.text() === saveText);
      expect(saveButton.first()).toHaveLength(data.saveButtonLength);
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
