const cms = require('./cms.json');

export const languages = {
  default: 'en_US',
  english: 'en_US',
  french: 'fr_FR',
};

const get = (lang: string, id: string): string => {
  let content = cms[lang][id];
  if (!content) {
    content = '';
  }
  return content;
};

const getDefault = (id: string): string => get(languages.default, id);

export const getByLanguage = (lang: string, id: string): string => {
  let content = get(lang, id);
  if (content.length === 0) {
    content = getDefault(id);
  }
  return content;
};
