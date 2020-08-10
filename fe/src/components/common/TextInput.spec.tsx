import * as React from 'react';
import { mount } from 'enzyme';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  const textValue = 'text value';

  it('should render default UI', () => {
    const wrapper = mount(<TextInput content={textValue} />);
    expect(wrapper.find('input').first().instance().value).toEqual(textValue);
  });

  it('should set the class property', () => {
    const wrapper = mount(<TextInput content={textValue} className="whatever" />);
    expect(wrapper.find('.input').length).toEqual(1);
    expect(wrapper.find('.input.whatever').length).toEqual(1);
  });

  it('should execute \'onChange\'', () => {
    const onChangeAction = jest.fn();
    const wrapper = mount(<TextInput content={textValue} onChange={onChangeAction} />);
    expect(onChangeAction).toHaveBeenCalledTimes(0);
    wrapper.find('input').first().simulate('change');
    expect(onChangeAction).toHaveBeenCalledTimes(1);
  });
});
