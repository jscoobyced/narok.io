import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { buildTitle, buildArticleComponent } from './BlogContentBuilder';
import { toArticle, toBlogContentText, Align } from '../../models/blog/ArticleData';
import { toUser, toSecureUser } from '../../models/User';
import { mountComponent } from '../jestUtil';

const getStaticTitleContent = (
  wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>,
)
  : string => wrapper.find('h2').first().html();

const textValue = 'text value';
const expectedStaticTitle = `<h2 class="article__title">${textValue}</h2>`;

describe('BlogContentBuilder', () => {
  it('should create the read-only title UI for {false, false}', () => {
    const title = shallow(buildTitle(textValue, false, false, () => { }));
    expect(getStaticTitleContent(title)).toEqual(expectedStaticTitle);
  });

  it('should create the read-only title UI for {true, false}', () => {
    const title = shallow(buildTitle(textValue, true, false, () => { }));
    expect(getStaticTitleContent(title)).toEqual(expectedStaticTitle);
  });

  it('should create the read-only title UI for {false, true}', () => {
    const title = shallow(buildTitle(textValue, false, true, () => { }));
    expect(getStaticTitleContent(title)).toEqual(expectedStaticTitle);
  });

  it('should create the read/write title UI for {true, true}', () => {
    const title = shallow(buildTitle(textValue, true, true, () => { }));
    expect(title.find('.input.article__title').length).toEqual(1);
  });

  it('should execute \'onChange\'', () => {
    const onChangeAction = jest.fn();
    const title = shallow(buildTitle(textValue, true, true, onChangeAction));
    expect(onChangeAction).toHaveBeenCalledTimes(0);
    title.find('.input.article__title').simulate('blur');
    expect(onChangeAction).toHaveBeenCalledTimes(1);
  });

  const user = toUser(1, 'John Smith', 'john.smith@example.org', '123456');
  const blogContent1 = toBlogContentText('content', Align.Center, '', 1);
  const secureUser = toSecureUser(user.id, user.name, user.email, user.referenceId, '', '', 0, 0);
  const blogContent2 = toBlogContentText('content', Align.Center, '', 2);
  const articleData = toArticle(1, user, 'This is a title', [blogContent1, blogContent2], '', '');
  const cms = {
    noResult: 'No result found.',
    fromOwner: 'By ',
    edit: 'Edit',
    save: 'Save',
  };

  it('should build an article', () => {
    const articleComponent = buildArticleComponent(articleData, secureUser, cms, true);
    const wrapper = mountComponent(articleComponent);
    expect(wrapper.find('article').length).toEqual(1);
  });

  it('should return \'No result found.\' if there is no article', () => {
    const articleComponent = buildArticleComponent(undefined, secureUser, cms, true);
    const wrapper = mountComponent(articleComponent);
    expect(wrapper.text()).toEqual(cms.noResult);
  });
});
