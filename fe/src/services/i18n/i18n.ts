const i18n = require('./i18n.json');

export const languages = {
  default: 'en_US',
  english: 'en_US',
  french: 'fr_FR',
};

const get = (lang: string, id: string): string => {
  let cms = i18n[lang][id];
  if (!cms) {
    cms = '';
  }
  return cms;
};

const getDefault = (id: string): string => get(languages.default, id);

export const getByLanguage = (lang: string, id: string): string => {
  let cms = get(lang, id);
  if (cms.length === 0) {
    cms = getDefault(id);
  }
  return cms;
};

export const CMS = {
  SIGNIN: 'SIGNIN',
  SIGNOUT: 'SIGNOUT',
  HELLO: 'HELLO',
};
