import * as React from 'react';
import { AppContext } from '../../../services/context/context';
import { Header } from './Header';
import { mountComponent } from '../../jestUtil';

describe('Header', () => {
  it('should display properly', () => {
    const header = mountComponent(<Header />);
    expect(header.find('header')).toHaveLength(1);
    header.find('select').first().simulate('change');
    expect(header.find('.header__title')).toHaveLength(1);
  });

  it('should update language', () => {
    const setLanguage = jest.fn();
    const header = mountComponent(<Header />, setLanguage);
    expect(header.find('header')).toHaveLength(1);
    const select = header.find('select');
    expect(select).toHaveLength(1);
    select.first().simulate('change');
    expect(setLanguage).toHaveBeenCalledTimes(1);
    expect(header.find('.header__title')).toHaveLength(1);
  });
});
