import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/main/Home/Home';
import './styles/_main.scss';
import HttpService from './services/http/http';
import { httpServiceMock } from './mocks/mock';

/* eslint-disable */
let httpService;

const mode = process.env.mode as string;
if (mode === 'development') {
  httpService = httpServiceMock();
} else {
  httpService = new HttpService();
}

ReactDOM.render(
  <Home httpService={httpService} mode={mode} />,
  document.getElementById('root'),
);
