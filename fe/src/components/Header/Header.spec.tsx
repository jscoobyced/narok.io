import { mount } from 'enzyme';
import * as React from 'react';
import { AppContext } from '../../services/context/context';
import { Header } from './Header';

describe('Header', () => {
  it('should display properly', () => {
    const language = 'en_US';
    const setLanguage = jest.fn();
    const getContent = (value: string) => '';
    const header = mount(
      <AppContext.Provider value={{ language, setLanguage, getContent }}>
        <Header />
      </AppContext.Provider>,
    );
    expect(header.find('header')).toHaveLength(1);
    const select = header.find('select');
    expect(select).toHaveLength(1);
    expect(select.first().simulate('change'));
    expect(setLanguage).toHaveBeenCalledTimes(1);
    expect(header.find('.header__title')).toHaveLength(1);
  });
});
