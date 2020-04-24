import * as React from 'react';
import { useState } from 'react';
import googleHandler from './GoogleHandler';

const GoogleButton = () => {
  const [userName, setUserName] = useState('Login');
  const props = {
    clientId: '1043504553067-c3tp3a90ktjt9m8souf3ind2riohn05k.apps.googleusercontent.com',
    scope: 'profile email',
    isSignedIn: false,
    onSuccess: (user: any) => {
      setUserName(user.getGivenName());
      return 0;
    },
    onFailure: (error: any) => 0,
  };
  const signIn = googleHandler(props);
  return (
    <span
      role="none"
      style={{ padding: 10, backgroundColor: '#FFF', cursor: 'pointer' }}
      onClick={signIn}
    >
      {userName}
    </span>
  );
};

export default GoogleButton;
