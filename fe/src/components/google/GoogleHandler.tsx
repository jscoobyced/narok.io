import { useState, useEffect } from 'react';
import Loader from '../../common/loader';

const myWindow = window as any;

const googleHandler = (props: {
    clientId: string;
    scope: string;
    isSignedIn: boolean;
    onSuccess: (user: any) => {};
    onFailure: (error: any) => {};
}) => {
  const [loaded, setLoaded] = useState(false);
  const loader = new Loader();

  const initGoogle = () => {
    if (!myWindow.gapi.auth2.getAuthInstance()) {
      const params = {
        client_id: props.clientId,
        scope: props.scope,
        accessType: 'online',
        cookiePolicy: 'single_host_origin',
        fetchBasicProfile: true,
      };
      myWindow.gapi.auth2.init(params).then(
        (response: any) => {
          setLoaded(true);
          if (props.isSignedIn && response.isSignedIn.get()) {
            props.onSuccess(response.currentUser.get());
          }
        },
        (error: any) => props.onFailure(error),
      );
    }
  };

  useEffect(() => {
    loader.registerEvent('jsc', () => {
      myWindow.gapi.load('client:auth2', initGoogle);
    });
    loader.load(document,
      'jsc-google-login',
      'https://apis.google.com/js/api.js?onload=jscGoogleApi',
      'jsc',
      'jscGoogleApi');
  });

  const signIn = ((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event) {
      event.preventDefault();
    }
    if (loaded) {
      const auth2 = myWindow.gapi.auth2.getAuthInstance();
      auth2.signIn({}).then(
        (response: any) => props.onSuccess(response.getBasicProfile()),
        (error: any) => props.onFailure(error),
      );
    }
  });

  return signIn;
};

export default googleHandler;
