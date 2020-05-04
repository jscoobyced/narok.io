import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { AppContext } from '../services/context/context';
import DataService from '../services/data/data';
import HttpServiceMock from '../services/http/http.mock';

export const mountComponent = (
  children: JSX.Element,
  customSetLanguage?: (lang: string) => void,
  data?: any
) => {
  const language = 'en_US';
  const setLanguage = customSetLanguage || ((lang: string) => { });
  const getContent = (value: string) => '';
  const dataService = new DataService(new HttpServiceMock(data));

  return mount(
    <AppContext.Provider value={{ language, setLanguage, getContent, dataService }}>
      {children}
    </AppContext.Provider>,
  );
};

export const getText = (element: ShallowWrapper | ReactWrapper, className: string) => {
  const found = element.find(className);
  if (found.length === 0) return '';
  return found.text();
}
