import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/home/home';
import { AppContext } from './services/context/context';
import * as i18n from './services/i18n/i18n';
import './styles/_main.scss';

ReactDOM.render(
  <AppContext.Provider value={{ currentLangage: i18n.languages.default }}>
    <Home />
  </AppContext.Provider>,
  document.getElementById('root'),
);
