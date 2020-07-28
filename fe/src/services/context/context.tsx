import * as React from 'react';
import { IAuthenticationHandler } from '../auth/handler';
import DataService from '../data/data';
import { SecureUser } from '../../models/User';

interface IAppContext {
  language: string;
  setLanguage: (language: string) => void;
  getContent: (content: string) => string;
  dataService: DataService;
  user: SecureUser;
  setUser: (user: SecureUser) => void;
  createUser: (user: any) => SecureUser;
  handler: IAuthenticationHandler;
}

export const AppContext = React.createContext<IAppContext>(undefined);
