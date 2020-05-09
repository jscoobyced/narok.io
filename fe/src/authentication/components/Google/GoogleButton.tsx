import * as React from 'react';
import { useState } from 'react';
import googleHandler from './googleHandler';
import Icon from './GoogleIcon';
import { SecureUser, toSecureUser, newSecureUser } from '../../models/User';
import './GoogleButton.scss';

const GoogleButton = (props: {
  signInText: string,
  signOutText: string,
  setUser: (user: SecureUser) => void
}) => {
  const { signInText, signOutText, setUser } = props;
  const [buttonName, setButtonName] = useState(signInText);
  const [isSignedIn, setSignedIn] = useState(false);
  const icon = isSignedIn ? <></> : <Icon />;


  /* istanbul ignore next */
  const createUser = (googleUser: gapi.auth2.GoogleUser): SecureUser => {
    const user = googleUser.getBasicProfile();
    const auth = googleUser.getAuthResponse();
    return toSecureUser(user.getId(), user.getName(), user.getGivenName(),
      user.getFamilyName(), user.getEmail(), auth.access_token, auth.scope,
      user.getImageUrl(), auth.expires_in, auth.expires_at);
  };

  /* istanbul ignore next */
  const googleHandlerProps = {
    isSignedIn,
    onSignInSuccess: (user: gapi.auth2.GoogleUser) => {
      setButtonName(signOutText);
      setUser(createUser(user));
      setSignedIn(true);
      return 0;
    },
    onSignOutSuccess: () => {
      setButtonName(signInText);
      setUser(newSecureUser());
      setSignedIn(false);
      return 0;
    },
    onFailure: (error: any) => {
      setSignedIn(false);
      return 0;
    },
  };
  const { signIn, signOut } = googleHandler(googleHandlerProps);
  const method = isSignedIn ? signOut : signIn;

  return (
    <span
      role="none"
      className={`google-button signed-in_${isSignedIn}`}
      onClick={method}
    >
      {icon}
      {buttonName}
    </span>
  );
};

export default GoogleButton;
