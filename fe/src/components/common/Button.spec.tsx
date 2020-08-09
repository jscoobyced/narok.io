import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('Button', () => {
  it('should render empty UI', () => {
    const action = jest.fn();
    const wrapper = shallow(<Button
      className=""
      onClick={action}
    />);
    expect(wrapper.children().length).toEqual(0);
  });

  it('should render children', () => {
    const action = jest.fn();
    const content = 'text';
    const wrapper = shallow(
      <Button
        className=""
        onClick={action}
      >
        {content}
      </Button>,
    );
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.children().first().text()).toEqual(content);
  });

  it('should call its action', () => {
    const action = jest.fn();
    const content = 'text';
    const wrapper = shallow(
      <Button
        className="whatever"
        onClick={action}
      >
        {content}
      </Button>,
    );
    wrapper.simulate('click');
    wrapper.simulate('keyPress');
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('should call its async action', () => {
    const action = jest.fn();
    const onMouseDown = jest.fn();
    const content = 'text';
    const wrapper = shallow(
      <Button
        className=""
        onClick={action}
        onMouseDown={onMouseDown}
      >
        {content}
      </Button>,
    );
    wrapper.simulate('mouseDown');
    expect(action).toHaveBeenCalledTimes(0);
    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });
});
