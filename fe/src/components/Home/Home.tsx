import * as React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AppContext } from '../../services/context/context';
import * as i18n from '../../services/i18n/i18n';
import './Home.scss';

export const Home = () => {
  const [language, setLanguage] = React.useState(i18n.languages.default);
  const getContent = (content: string) => i18n.getByLanguage(language, content);

  return (
    <AppContext.Provider value={{ language, setLanguage, getContent }}>
      <Header />
      <div className="container">
        <section />
      </div>
      <Footer />
    </AppContext.Provider>
  );
};
