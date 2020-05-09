import * as React from 'react';
import { AppContext } from '../../../services/context/context';
import CMS from '../../../services/i18n/cms';
import './SidePanel.scss';

export const SidePanel = () => {
  const { getContent, user } = React.useContext(AppContext);
  const codehosted = getContent(CMS.CODEHOSTED);
  const builtwith = getContent(CMS.BUILTWITH);
  const coverage = getContent(CMS.COVERAGE);
  const container = getContent(CMS.CONTAINER);

  return (
    <>
      <span>{user.user.name}</span>
      <span className="aside__links">
        {`${codehosted} `}
        <a
          href="https://github.com/jscoobyced/narok.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/octocat.png" alt="GitHub" />
        </a>
      </span>
      <span className="aside__links">
        {`${builtwith} `}
        <a
          href="https://circleci.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/circleci.png" alt="CircleCI" />
        </a>
      </span>
      <span className="aside__links">
        {`${coverage} `}
        <a
          href="https://codecov.io/gh/jscoobyced/narok.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/codecov.png" alt="Codecov" />
        </a>
      </span>
      <span className="aside__links">
        {`${container} `}
        <a
          href="https://hub.docker.com/r/jscdroiddev/narokio-fe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/docker.png" alt="Docker Hub" />
        </a>
      </span>
    </>
  );
};
