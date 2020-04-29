import * as Config from './config';

describe('config service', () => {
  it('should contain application data', () => {
    const application = Config.getApplicationConfig();
    expect(application.Port).not.toBeNull();
    expect(application.Port).not.toBeNaN();
    expect(application.Server).not.toBeNull();
  });

  it('should contain copyright data', () => {
    const copyright = Config.getCopyright();
    expect(copyright.Year).not.toBeNull();
    expect(copyright.Year).not.toBeNaN();
    expect(copyright.Author).not.toBeNull();
  });

  it('should contain google data', () => {
    const googleParams = Config.getGoogleParams();
    expect(googleParams.accessType).not.toBeNull();
    expect(googleParams.client_id).not.toBeNull();
    expect(googleParams.cookiePolicy).not.toBeNull();
    expect(googleParams.fetchBasicProfile).toBeTruthy();
    expect(googleParams.scope).not.toBeNull();
  });
});
