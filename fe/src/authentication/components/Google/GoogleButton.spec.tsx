import { mount } from 'enzyme';
import * as React from 'react';
import GoogleButton from './GoogleButton';

const signInMock = jest.fn();
const signOutMock = jest.fn();

jest.mock('./googleHandler', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signIn: signInMock,
    signOut: signOutMock,
  })),
}));

describe('GoogleButton', () => {
  const setUser = jest.fn();
  it('should render the default button', () => {
    const googleButton = mount(<GoogleButton
      signInText="Sign In"
      signOutText="Sign Out"
      setUser={setUser}
    />);
    const button = googleButton.find('.google-button').first();
    button.simulate('click');
    expect(signInMock).toHaveBeenCalledTimes(1);
  });
});
