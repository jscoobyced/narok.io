import * as React from 'react';
import * as i18n from '../i18n/i18n';

export const AppContext = React.createContext(
    {
        currentLangage: i18n.languages.default
    }
);