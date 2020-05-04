import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { AppContext } from '../services/context/context';

export const mountComponent = (children: JSX.Element, customSetLanguage?: (lang: string) => void) => {
  const language = 'en_US';
  const setLanguage = customSetLanguage || ((lang: string) => { });
  const getContent = (value: string) => '';

  return mount(
    <AppContext.Provider value={{ language, setLanguage, getContent }}>
      {children}
    </AppContext.Provider>,
  );
};

export const getText = (element: ShallowWrapper | ReactWrapper, className: string) => {
  const found = element.find(className);
  if (found.length === 0) return '';
  return found.text();
}
