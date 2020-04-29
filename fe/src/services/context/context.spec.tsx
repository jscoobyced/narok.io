import { mount } from 'enzyme';
import * as React from 'react';
import { AppContext } from './context';

const Empty = () => {
  const context = React.useContext(AppContext);
  const { currentLangage } = context;
  return (
    <div className="test">{currentLangage}</div>
  );
};

describe('context service', () => {
  it('should contain current language', () => {
    const expected = 'en_US';
    const component = mount(
      <AppContext.Provider value={{ currentLangage: expected }}>
        <Empty />
      </AppContext.Provider>,
    );
    const div = component.find('.test');
    expect(div).toHaveLength(1);
    expect(div.first().text()).toEqual(expected);
  });
});
