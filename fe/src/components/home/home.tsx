import * as React from 'react';
import './home.scss';
import * as i18n from '../../services/i18n/i18n';
import { AppContext } from '../../services/context/context';
import * as Config from '../../services/config/config';
import GoogleButton from '../google/GoogleButton';

export const Home = () => {
  const context = React.useContext(AppContext);
  const { currentLangage } = context;
  const signInText = i18n.getByLanguage(currentLangage, i18n.CMS.SIGNIN);

  return (
    <>
      <header>
        <h1>Hello, TypeScript + React!</h1>
      </header>
      <div className="container">
        <section>
          <GoogleButton signInText={signInText} />
        </section>
      </div>
      <footer>
        &copy; Copyright
        {' '}
        {Config.getCopyright().Year}
        {' '}
        {Config.getCopyright().Author}
      </footer>
    </>
  );
};
