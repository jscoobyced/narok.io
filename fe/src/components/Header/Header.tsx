import * as React from 'react';
import * as i18n from '../../services/i18n/i18n';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import './Header.scss';

export const Header = () => {
  const { getContent, setLanguage } = React.useContext(AppContext);
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLanguage(event.target.value);
  };
  const english = getContent(CMS.LANGUAGE_EN);
  const french = getContent(CMS.LANGUAGE_FR);
  const website = getContent(CMS.WEBSITE_TITLE);
  const subtitle = getContent(CMS.WEBSITE_SUBTITLE);

  return (
    <header>
      <img
        src="/images/flame.png"
        title="Narok.io logo"
        alt="Flame"
      />
      <span className="header__title">{website}</span>
      {' - '}
      <span className="header__subtitle">{subtitle}</span>
      <select onChange={changeLanguage}>
        <option value={i18n.languages.english}>{english}</option>
        <option value={i18n.languages.french}>{french}</option>
      </select>

    </header>
  );
};
