import * as React from 'react';
import { SecureUser } from '../../../models/User';
import { AppContext } from '../../../services/context/context';
import SignInButton from '../../../authentication/components/SignInButton';
import * as i18n from '../../../services/i18n/i18n';
import CMS from '../../../services/i18n/cms';
import './Header.scss';

export const Header = () => {
  const {
    getContent, setLanguage, setUser, createUser, handler, dataService,
  } = React.useContext(AppContext);
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLanguage(event.target.value);
  };
  const english = getContent(CMS.LANGUAGE_EN);
  const french = getContent(CMS.LANGUAGE_FR);
  const website = getContent(CMS.WEBSITE_TITLE);
  const subtitle = getContent(CMS.WEBSITE_SUBTITLE);
  const signIn = getContent(CMS.SIGNIN);
  const signOut = getContent(CMS.SIGNOUT);

  const setupUser = (user: SecureUser) => {
    setUser(user);
    dataService.setToken(user.authToken.accessToken);
  };

  return (
    <header>
      <img
        src="/images/demon-logo-small.png"
        title="Narok.io logo"
        alt="Flame"
      />
      <span className="header__title">{website}</span>
      <select onChange={changeLanguage}>
        <option value={i18n.languages.english}>{english}</option>
        <option value={i18n.languages.french}>{french}</option>
      </select>
      <SignInButton
        signInText={signIn}
        signOutText={signOut}
        setUser={setupUser}
        createUser={createUser}
        handler={handler}
      />
      <span className="header__subtitle">{subtitle}</span>

    </header>
  );
};
