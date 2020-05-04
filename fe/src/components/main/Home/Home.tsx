import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '../../routes';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AppContext } from '../../../services/context/context';
import * as i18n from '../../../services/i18n/i18n';
import CMS from '../../../services/i18n/cms';
import HttpService from '../../../services/http/http';
import DataService from '../../../services/data/data';
import './Home.scss';

export const Home = (props: { httpService: HttpService }) => {
  const [language, setLanguage] = React.useState(i18n.languages.default);
  const getContent = (content: string) => i18n.getByLanguage(language, content);
  const { httpService } = props;
  const dataService = new DataService(httpService);

  document.title = `${getContent(CMS.WEBSITE_TITLE)} - ${getContent(CMS.WEBSITE_SUBTITLE)}`;

  return (
    <AppContext.Provider value={{
      language, setLanguage, getContent, dataService,
    }}
    >
      <BrowserRouter>
        <Header />
        <div className="container">
          <section>
            <Routes />
          </section>
          <aside />
        </div>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
};
