import * as React from 'react';
import { AppContext } from '../../../services/context/context';
import CMS from '../../../services/i18n/cms';
import './Footer.scss';

export const Footer = () => {
  const { getContent } = React.useContext(AppContext);
  const year = getContent(CMS.COPYYEAR);
  const author = getContent(CMS.COPYAUTHOR);
  const copy = getContent(CMS.COPYRIGHT);

  return (
    <footer>
      &copy;
      {' '}
      {copy}
      {' '}
      {year}
      {' '}
      {author}
    </footer>
  );
};
