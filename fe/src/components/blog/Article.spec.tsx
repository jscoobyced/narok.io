import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  ArticleData, BlogContent, toBlogContentText, toBlogContentImage, Align,
} from '../../models/blog/ArticleData';
import { Article } from './Article';
import { getText, mountComponent } from '../jestUtil';
import { User } from '../../models/User';
import CMS from '../../services/i18n/cms';

describe('Article', () => {
  const textContent: BlogContent = toBlogContentText('content', Align.Center, '', 1);
  const imageContent: BlogContent = toBlogContentImage('url');
  const owner: User = { id: 12345678, name: 'Administrator' };
  const baseArticle: ArticleData = {
    id: 1,
    owner,
    title: 'title',
    contents: [textContent, imageContent],
    created: 'created',
    modified: 'modified',
  };
  const editText = 'Edit';
  const saveText = 'Save';
  const addContentText = 'Add Text';
  const testData = [
    {
      hasEditPermission: false,
      isEditing: false,
      length: 1,
      editButtonLength: 0,
      saveButtonLength: 0,
      title: baseArticle.title,
    },
    {
      hasEditPermission: false,
      isEditing: true,
      length: 1,
      editButtonLength: 0,
      saveButtonLength: 0,
      title: baseArticle.title,
    },
    {
      hasEditPermission: true,
      isEditing: false,
      length: 1,
      editButtonLength: 1,
      saveButtonLength: 0,
      title: baseArticle.title,
    },
    {
      hasEditPermission: true,
      isEditing: true,
      length: 1,
      editButtonLength: 0,
      saveButtonLength: 1,
      title: baseArticle.title,
    },
  ];

  const cms = (value: string) => {
    if (value === CMS.EDIT) return editText;
    if (value === CMS.SAVE) return saveText;
    if (value === CMS.ADDBLOGCONTENT) return addContentText;
    return '';
  };

  testData.forEach((data) => {
    it(`should render text content with {${data.hasEditPermission}, ${data.isEditing}}`, () => {
      const article = { ...baseArticle };
      const blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission={data.hasEditPermission}
          isEditing={data.isEditing}
        />,
        undefined,
        article,
        undefined,
        cms,
      );
      expect(blogContent.find('article')).toHaveLength(data.length);
      expect(getText(blogContent, '.article__title')).toEqual(data.title);
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

  it('should skip updating state when title is empty', () => {
    const data = ['', undefined];
    data.forEach(title => {
      const article = { ...baseArticle, title };
      const blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        article,
        undefined,
        cms,
      );
      const titleComponent = blogContent
        .find('.input.article__title')
        .first();
      expect(titleComponent).toBeDefined();
      titleComponent.simulate('blur');
    });
  });

  it('should skip updating state when text is empty', () => {
    const data = ['', undefined];
    data.forEach(content => {
      const article = { ...baseArticle, contents: [toBlogContentText(content)] };
      const blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        article,
        undefined,
        cms,
      );
      const blogContentComponent = blogContent
        .find('.article__content-editing')
        .first();
      expect(blogContentComponent).toBeDefined();
      blogContentComponent.simulate('blur');
    });
  });

  it('should update an article', async () => {
    const article = { ...baseArticle };
    const result = { id: 1, message: 'Complete.' };
    let blogContent = mount(<></>);
    await act(async () => {
      blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        result,
        undefined,
        cms,
      );
      const titleComponent = blogContent
        .find('.input.article__title')
        .first();
      titleComponent.simulate('blur');
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText)
        .first();
      saveButton.simulate('click');
      saveButton.simulate('keypress');
    });
  });

  it('should show a message when can\'t update an article', async () => {
    const article = { ...baseArticle };
    const result = { id: 2, message: '' };
    await act(async () => {
      const blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        result,
        undefined,
        cms,
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
    article.id = -1;
    const result = { id: 1, message: '' };
    await act(async () => {
      const blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        result,
        undefined,
        cms,
      );
      const bgContent = blogContent
        .find(`#ebc-c-${textContent.id}`)
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
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        result,
        undefined,
        cms,
      );
      const saveButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === saveText)
        .first();
      saveButton.simulate('click');
    });
  });

  it('should not fail if type of content is unkown', () => {
    const article = { ...baseArticle, contents: [textContent] };
    article.contents = [{} as BlogContent];
    const blogContent = mountComponent(<Article
      article={article}
      hasEditPermission={false}
      isEditing={false}
    />);
    expect(blogContent.find('article')).toHaveLength(1);
  });

  it('should add a blog content', async () => {
    const article = { ...baseArticle };
    const result = { id: 1, message: 'Complete.' };
    let blogContent = mount(<></>);
    await act(async () => {
      blogContent = mountComponent(
        <Article
          article={article}
          hasEditPermission
          isEditing
        />,
        undefined,
        result,
        undefined,
        cms,
      );
      const addContentButton = blogContent
        .find('span.button')
        .findWhere(element => element !== null && element.text() === addContentText)
        .first();
      addContentButton.simulate('click');
    });
  });
});
