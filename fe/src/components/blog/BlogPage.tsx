import * as React from 'react';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent } = React.useContext(AppContext);
  const soon = getContent(CMS.COMINGSOON);

  return (
    <div>
      {soon}
    </div>
  );
};
