import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/main/Home/Home';
import './styles/_main.scss';
import HttpService from './services/http/http';
import { dataServiceMock, userServiceMock } from './mocks/mock';
import GoogleUserService from './authentication/components/Google/user';
import { GoogleAuthenticationHandler } from './authentication/components/Google/GoogleHandler';
import { AuthenticationHandler } from './services/auth/handler';
import DataService from './services/data/data';

/* eslint-disable */
let dataService;
let userService;
let handler;

const mode = process.env.mode as string;
if (mode === 'development') {
  dataService = dataServiceMock();
  userService = userServiceMock();
  handler = new AuthenticationHandler();
} else {
  const httpService = new HttpService();
  dataService = new DataService(mode, httpService);
  userService = new GoogleUserService();
  handler = new GoogleAuthenticationHandler();
}

ReactDOM.render(
  <Home dataService={dataService} userService={userService} handler={handler} />,
  document.getElementById('root'),
);
