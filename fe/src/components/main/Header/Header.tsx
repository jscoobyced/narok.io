import * as React from 'react';
import { newSecureUser } from '../../../authentication/models/User';
import { AppContext } from '../../../services/context/context';
import GoogleButton from '../../../authentication/components/Google/GoogleButton';
import * as i18n from '../../../services/i18n/i18n';
import CMS from '../../../services/i18n/cms';
import './Header.scss';

export const Header = () => {
  const { getContent, setLanguage, setUser } = React.useContext(AppContext);
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
      <GoogleButton signInText={signIn} signOutText={signOut} setUser={setUser} />
      <span className="header__subtitle">{subtitle}</span>

    </header>
  );
};
