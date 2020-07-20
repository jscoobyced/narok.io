import Loader from '../../common/loader';
import * as Config from '../../../services/config/config';
import { IAuthenticationHandler, AuthenticationProperties } from '../../../services/auth/handler';

/* global gapi */

export class GoogleAuthenticationHandler implements IAuthenticationHandler {
  private loader = new Loader();

  private properties: AuthenticationProperties;

  /* istanbul ignore next */
  public init = (properties: AuthenticationProperties) => {
    this.properties = properties;
    this.loader.registerEvent('jsc', () => {
      if (gapi) {
        gapi.load('client:auth2', this.initGoogle);
      }
    });
    this.loader.load(document,
      'jsc-google-login',
      'https://apis.google.com/js/api.js?onload=jscGoogleApi',
      'jsc',
      'jscGoogleApi');
  }

  private initGoogle = () => {
    if (gapi && gapi.auth2 && !gapi.auth2.getAuthInstance()) {
      const googleParams = Config.getGoogleParams();
      gapi.auth2.init(googleParams).then(
        (response: gapi.auth2.GoogleAuth) => {
          if (this.properties.isSignedIn || response.isSignedIn.get()) {
            this.properties.doSignIn(this.properties.createUser(response.currentUser.get()));
          }
        },
        (error: any) => this.properties.doSignOut(),
      );
    }
  }

  public signIn = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (gapi && gapi.auth2) {
      gapi.auth2.getAuthInstance().signIn({}).then(
        (response: gapi.auth2.GoogleUser) => this.properties.doSignIn(this.properties.createUser(response)),
        (error: any) => this.properties.doSignOut(),
      );
    }
  };

  public signOut = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    if (gapi && gapi.auth2) {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(
        auth2.disconnect().then(this.properties.doSignOut()),
      );
    }
  };
}
