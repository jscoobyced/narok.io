import { AuthenticationHandler, AuthenticationProperties } from './handler';
import { SecureUser, newSecureUser } from '../../models/User';

const createProperties = (
  doSignIn: (user: SecureUser) => void,
  doSignOut: () => void,
): AuthenticationProperties => ({
  isSignedIn: true,
  doSignIn,
  doSignOut,
  createUser: (user: any) => newSecureUser(),
});

describe('AuthenticationHandler', () => {
  it('should be initialize the login methods', () => {
    const doSignIn = jest.fn();
    const doSignOut = jest.fn();
    const properties = createProperties(doSignIn, doSignOut);
    const handler = new AuthenticationHandler();
    handler.init(properties);
    handler.signIn(false);
    handler.signOut(false);
    handler.signIn({ preventDefault: () => { } });
    handler.signOut({ preventDefault: () => { } });
    expect(doSignIn).toHaveBeenCalledTimes(2);
    expect(doSignOut).toHaveBeenCalledTimes(2);
  });
});
