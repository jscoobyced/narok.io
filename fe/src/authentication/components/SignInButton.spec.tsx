import * as React from 'react';
import SignInButton from './SignInButton';
import { mountComponent } from '../../components/jestUtil';
import { AuthenticationHandler } from '../../services/auth/handler';

afterEach(() => {
  jest.resetAllMocks();
});

describe('SignInButton', () => {
  const setUser = jest.fn();
  const createUser = jest.fn();
  const handler = new AuthenticationHandler();
  it('should be bale to sign-in and sign-out', () => {
    const googleButton = mountComponent(<SignInButton
      signInText="Sign In"
      signOutText="Sign Out"
      setUser={setUser}
      createUser={createUser}
      handler={handler}
    />);
    const button = googleButton.find('.signin-button').first();
    button.simulate('click');
    expect(setUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledTimes(1);
    button.simulate('click');
    expect(setUser).toHaveBeenCalledTimes(2);
    expect(createUser).toHaveBeenCalledTimes(1);
  });
});
