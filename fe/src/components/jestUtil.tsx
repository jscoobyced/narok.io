import { mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../services/context/context';
import DataServiceMock from '../services/data/data.mock';
import { newSecureUser } from '../models/User';

export const mountComponent = (
  children: JSX.Element,
  customSetLanguage?: (lang: string) => void,
  data?: any,
  token?: string
) => {
  const language = 'en_US';
  const setLanguage = customSetLanguage || ((lang: string) => { });
  const getContent = (value: string) => '';
  const dataService = new DataServiceMock(data);
  const user = newSecureUser();
  if(!!token) {
    user.authToken.accessToken = token;
    dataService.setToken(token);
  }
  const setUser = jest.fn();
  const createUser = jest.fn();
  const handler = {
    init: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
  }

  return mount(
    <AppContext.Provider value={{ language, setLanguage, getContent, dataService, user, setUser, createUser, handler }}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AppContext.Provider>,
  );
};

export const getText = (element: ShallowWrapper | ReactWrapper, className: string) => {
  const found = element.find(className);
  if (found.length === 0) return '';
  return found.text();
}
