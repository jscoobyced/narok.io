import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '../../routes';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SidePanel } from '../Side/SidePanel';
import { AppContext } from '../../../services/context/context';
import CMS from '../../../services/i18n/cms';
import HttpService from '../../../services/http/http';
import DataService from '../../../services/data/data';
import * as i18n from '../../../services/i18n/i18n';
import { newSecureUser } from '../../../models/User';
import './Home.scss';
import { UserService } from '../../../services/auth/user';
import { IAuthenticationHandler } from '../../../services/auth/handler';

export const Home = (props: {
  mode: string,
  httpService: HttpService,
  userService: UserService,
  handler: IAuthenticationHandler
}) => {
  const [language, setLanguage] = React.useState(i18n.languages.default);
  const [user, setUser] = React.useState(newSecureUser());
  const getContent = (content: string) => i18n.getByLanguage(language, content);
  const {
    mode, httpService, userService, handler,
  } = props;
  const { createUser } = userService;
  const dataService = new DataService(mode, httpService);

  document.title = `${getContent(CMS.WEBSITE_TITLE)} - ${getContent(CMS.WEBSITE_SUBTITLE)}`;

  return (
    <AppContext.Provider value={{
      language, setLanguage, getContent, dataService, user, setUser, createUser, handler,
    }}
    >
      <BrowserRouter>
        <Header />
        <div className="container">
          <section>
            <Routes />
          </section>
          <aside>
            <SidePanel />
          </aside>
        </div>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
};
