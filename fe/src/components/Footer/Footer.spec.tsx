import { mount } from 'enzyme';
import * as React from 'react';
import { Footer } from './Footer';
import { AppContext } from '../../services/context/context';

describe('Home', () => {
  it('should display properly', () => {
    const language = 'en_US';
    const setLanguage = (lang: string) => { };
    const getContent = (value: string) => '';
    const footer = mount(
      <AppContext.Provider value={{ language, setLanguage, getContent }}>
        <Footer />
      </AppContext.Provider>,
    );
    expect(footer.find('footer')).toHaveLength(1);
  });
});
