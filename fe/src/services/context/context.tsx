import * as React from 'react';
import DataService from '../data/data';
import { SecureUser } from '../../authentication/models/User';

interface IAppContext {
  language: string;
  setLanguage: (language: string) => void;
  getContent: (content: string) => string;
  dataService: DataService;
  user: SecureUser;
  setUser: (user: SecureUser) => void;
}

export const AppContext = React.createContext<IAppContext>(undefined);
