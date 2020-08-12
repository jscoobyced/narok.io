import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { buildTitle } from './BlogContentBuilder';

const getStaticTitleContent = (wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>): string => {
  return wrapper.find('h2').first().html();
}

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
    expect(title.find('input').length).toEqual(1);
  });

  it('should execute \'onChange\'', () => {
    const onChangeAction = jest.fn();
    const title = shallow(buildTitle(textValue, true, true, onChangeAction));
    expect(onChangeAction).toHaveBeenCalledTimes(0);
    title.find('input').simulate('change');
    expect(onChangeAction).toHaveBeenCalledTimes(1);
  });
});
