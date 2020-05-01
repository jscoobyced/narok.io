import * as i18n from './i18n';
import CMS from './cms';

describe('i18n service', () => {
  it('should be able to read English language', () => {
    const signIn = i18n.getByLanguage(i18n.languages.english, CMS.SIGNIN);
    expect(signIn).not.toBeNull();
    expect(signIn.length).not.toEqual(0);
  });

  it('should be able to retrive missing English translation as empty', () => {
    const unknown = i18n.getByLanguage(i18n.languages.english, 'UNKN0WN');
    expect(unknown).not.toBeNull();
    expect(unknown.length).toEqual(0);
  });

  it('should be able to read French language', () => {
    const signIn = i18n.getByLanguage(i18n.languages.french, CMS.SIGNIN);
    expect(signIn).not.toBeNull();
    expect(signIn.length).not.toEqual(0);
  });

  it('should be able to default missing French translation to Default', () => {
    const signInFr = i18n.getByLanguage(i18n.languages.french, CMS.LANGUAGE_EN);
    const signInDefault = i18n.getByLanguage(i18n.languages.default, CMS.LANGUAGE_EN);
    expect(signInFr).toEqual(signInDefault);
  });
});
