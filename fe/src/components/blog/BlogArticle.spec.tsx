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
      canEdit: false, isEditable: false, length: 1, editButtonLength: 0,
    },
    {
      canEdit: false, isEditable: true, length: 1, editButtonLength: 0,
    },
    {
      canEdit: true, isEditable: false, length: 1, editButtonLength: 1,
    },
    {
      canEdit: true, isEditable: true, length: 1, editButtonLength: 0,
    },
  ];

  testData.forEach((data) => {
    it(`should render text content with {${data.canEdit}, ${data.isEditable}}`, () => {
      const article = { ...baseArticle };
      const blogContent = mountComponent(
        <BlogArticle
          article={article}
          fromText="By"
          editText={editText}
          saveText={saveText}
          hasEditPermission={data.canEdit}
          isEditing={data.isEditable}
        />,
      );
      expect(blogContent.find('article')).toHaveLength(data.length);
      expect(getText(blogContent, '.article__title')).toEqual(article.title);
      expect(getText(blogContent, '.article__content')).toEqual(textContent.value);
      expect(blogContent.find('.article__image img')).toBeDefined();
      expect(getText(blogContent, '.article__created')).toEqual(article.created);
      expect(getText(blogContent, '.article__modified')).toEqual('');
      expect(blogContent.find('.button')).toHaveLength(data.editButtonLength);
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
