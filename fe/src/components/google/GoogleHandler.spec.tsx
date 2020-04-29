import { mount, shallow } from 'enzyme';
import * as React from 'react';
import googleHandler from './GoogleHandler';

const registerMock = jest.fn();
const loadMock = jest.fn();

jest.mock('../../common/loader', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    load: loadMock,
    registerEvent: registerMock,
  })),
}));

const googleHandlerProps = {
  isSignedIn: true,
  onSignInSuccess: (user: gapi.auth2.GoogleUser) => jest.fn(),
  onSignOutSuccess: () => jest.fn(),
  onFailure: (error: any) => jest.fn(),
};

const Empty = () => {
  const { signIn, signOut } = googleHandler(googleHandlerProps);
  return (
    <>
      <button type="button" onClick={signIn} className="sign-in">Sign-In</button>
      <button type="button" onClick={signOut} className="sign-out">Sign-Out</button>
    </>
  );
};

describe('GoogleHandler', () => {
  it('should register event and load the libraries', () => {
    mount(<Empty />);
    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(registerMock).toHaveBeenCalledTimes(1);
  });
});

describe('GoogleHandler', () => {
  it('should provide a valid signIn function', () => {
    const component = shallow(<Empty />);
    expect(component.find('.sign-in').first().simulate('click'));
    expect(component.find('.sign-out').first().simulate('click'));
  });
});
