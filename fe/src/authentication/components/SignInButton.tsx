import * as React from 'react';
import { SecureUser, newSecureUser } from '../../models/User';
import { IAuthenticationHandler } from '../../services/auth/handler';
import './SignInButton.scss';

const SignInButton = (properties: {
  signInText: string,
  signOutText: string,
  setUser: (user: SecureUser) => void,
  createUser: (user: any) => SecureUser,
  handler: IAuthenticationHandler;
}) => {
  const {
    signInText, signOutText, setUser, createUser, handler,
  } = properties;
  const [buttonName, setButtonName] = React.useState(signInText);
  const [isSignedIn, setSignedIn] = React.useState(false);

  const updateButton = (buttonSignedIn: boolean, buttonText: string) => {
    setButtonName(buttonText);
    setSignedIn(buttonSignedIn);
  };

  const handlerProps = {
    isSignedIn,
    doSignIn: (user: SecureUser) => {
      updateButton(true, signOutText);
      setUser(user);
    },
    doSignOut: () => {
      setUser(newSecureUser());
      updateButton(false, signInText);
    },
    createUser,
  };
  const { signIn, signOut, init } = handler;

  React.useEffect(() => {
    init(handlerProps);
  }, []);

  return (
    <span
      role="none"
      className={`signin-button signed-in_${isSignedIn}`}
      onClick={isSignedIn ? signOut : signIn}
    >
      {buttonName}
    </span>
  );
};

export default SignInButton;
