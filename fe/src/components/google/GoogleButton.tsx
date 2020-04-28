import * as React from 'react';
import { useState } from 'react';
import googleHandler from './GoogleHandler';
import Icon from './icon';
import './GoogleButton.scss';

const GoogleButton = (props: { signInText: string }) => {
  const [userName, setUserName] = useState(props.signInText);
  const [isSignedIn, setSignedIn] = useState(false);

  const googleHandlerProps = {
    isSignedIn,
    onSignInSuccess: (user: gapi.auth2.GoogleUser) => {
      setUserName(user.getBasicProfile().getName());
      setSignedIn(true);
      return 0;
    },
    onSignOutSuccess: () => {
      setUserName(props.signInText);
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
  const icon = isSignedIn ? <></> : <Icon />

  return (
    <span
      role="none"
      className={'google-button signed-in_' + isSignedIn}
      onClick={method}
    >
      {icon}
      {userName}
    </span>
  );
};

export default GoogleButton;
