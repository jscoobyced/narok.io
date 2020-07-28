import { SecureUser, newSecureUser } from '../../models/User';

export interface AuthenticationProperties {
  isSignedIn: boolean;
  doSignIn: (user: SecureUser) => void;
  doSignOut: () => void;
  createUser: (user: any) => SecureUser;
}

export interface IAuthenticationHandler {
  init: (properties: AuthenticationProperties) => void;
  signIn: (event: any) => void;
  signOut: (event: any) => void;
}

export class AuthenticationHandler implements IAuthenticationHandler {
  private properties: AuthenticationProperties;

  public init = (properties: AuthenticationProperties) => {
    this.properties = properties;
  }

  public signIn = ((event: any) => {
    if (event) {
      event.preventDefault();
    }
    this.properties.doSignIn(this.properties.createUser(newSecureUser()));
  });

  public signOut = ((event: any) => {
    if (event) {
      event.preventDefault();
    }
    this.properties.doSignOut();
  });

  public getLogo = (): any => '(N) '
}
