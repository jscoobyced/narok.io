import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/main/Home/Home';
import './styles/_main.scss';
import HttpService from './services/http/http';
import { httpServiceMock, userServiceMock } from './mocks/mock';
import GoogleUserService from './authentication/components/Google/user';
import { GoogleAuthenticationHandler } from './authentication/components/Google/GoogleHandler';
import { AuthenticationHandler } from './services/auth/handler';

/* eslint-disable */
let httpService;
let userService;
let handler;

const mode = process.env.mode as string;
if (mode === 'development') {
  httpService = httpServiceMock();
  userService = userServiceMock();
  handler = new AuthenticationHandler();
} else {
  httpService = new HttpService();
  userService = new GoogleUserService();
  handler = new GoogleAuthenticationHandler();
}

ReactDOM.render(
  <Home httpService={httpService} userService={userService} mode={mode} handler={handler} />,
  document.getElementById('root'),
);
