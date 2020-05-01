import * as React from 'react';

interface IAppContext {
  language: string;
  setLanguage: (language: string) => void;
  getContent: (content: string) => string;
}

export const AppContext = React.createContext<IAppContext>(undefined);
