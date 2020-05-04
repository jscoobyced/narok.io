import * as React from 'react';
import DataService from '../data/data';

interface IAppContext {
  language: string;
  setLanguage: (language: string) => void;
  getContent: (content: string) => string;
  dataService: DataService
}

export const AppContext = React.createContext<IAppContext>(undefined);
