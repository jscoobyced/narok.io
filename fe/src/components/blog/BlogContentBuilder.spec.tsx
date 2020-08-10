import * as React from 'react';
import { shallow } from 'enzyme';
import { buildTitle } from './BlogContentBuilder';

describe('BlogContentBuilder', () => {
  const textValue = 'text value';

  it('should create the read-only title UI for {false, false}', () => {
    const title = shallow(buildTitle(textValue, false, false, () => { }));
    expect(title.find('h2').first().text()).toEqual(textValue);
  });

  it('should create the read-only title UI for {true, false}', () => {
    const title = shallow(buildTitle(textValue, true, false, () => { }));
    expect(title.find('h2').first().text()).toEqual(textValue);
  });

  it('should create the read-only title UI for {false, true}', () => {
    const title = shallow(buildTitle(textValue, false, true, () => { }));
    expect(title.find('h2').first().text()).toEqual(textValue);
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
