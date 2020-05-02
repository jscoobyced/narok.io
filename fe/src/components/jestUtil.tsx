import { mount } from 'enzyme';
import * as React from 'react';
import { AppContext } from '../services/context/context';

export const mountComponent = (children: JSX.Element) => {
  const language = 'en_US';
  const setLanguage = (lang: string) => { };
  const getContent = (value: string) => '';

  return mount(
    <AppContext.Provider value={{ language, setLanguage, getContent }}>
      {children}
    </AppContext.Provider>,
  );
};
