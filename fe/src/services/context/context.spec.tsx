import { mount } from 'enzyme';
import * as React from 'react';
import { AppContext } from './context';

const Empty = () => {
  const context = React.useContext(AppContext);
  const { language } = context;
  return (
    <div className="test">{language}</div>
  );
};

describe('context service', () => {
  it('should contain current language', () => {
    const expected = 'en_US';
    const component = mount(
      <AppContext.Provider value={{ language: expected, setLanguage: () => { }, getContent: (s: string) => '' }}>
        <Empty />
      </AppContext.Provider>,
    );
    const div = component.find('.test');
    expect(div).toHaveLength(1);
    expect(div.first().text()).toEqual(expected);
  });
});
