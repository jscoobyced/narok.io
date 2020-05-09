import { useState, useEffect } from 'react';
import Loader from '../../common/loader';
import * as Config from '../../../services/config/config';

/* global gapi */

const googleHandler = (props: {
  isSignedIn: boolean;
  onSignInSuccess: (user: gapi.auth2.GoogleUser) => {};
  onSignOutSuccess: () => {};
  onFailure: (error: any) => {};
}) => {
  const [loaded, setLoaded] = useState(false);
  const loader = new Loader();

  /* istanbul ignore next */
  const initGoogle = () => {
    if (!gapi.auth2.getAuthInstance()) {
      const googleParams = Config.getGoogleParams();
      gapi.auth2.init(googleParams).then(
        (response: gapi.auth2.GoogleAuth) => {
          setLoaded(true);
          if (props.isSignedIn || response.isSignedIn.get()) {
            props.onSignInSuccess(response.currentUser.get());
          }
        },
        (error: any) => props.onFailure(error),
      );
    } else {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loader.registerEvent('jsc', () => {
      if (!loaded) {
        gapi.load('client:auth2', initGoogle);
      }
    });
    loader.load(document,
      'jsc-google-login',
      'https://apis.google.com/js/api.js?onload=jscGoogleApi',
      'jsc',
      'jscGoogleApi');
  }, []);

  /* istanbul ignore next */
  const signIn = ((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event) {
      event.preventDefault();
    }
    if (loaded) {
      gapi.auth2.getAuthInstance().signIn({}).then(
        (response: gapi.auth2.GoogleUser) => props.onSignInSuccess(response),
        (error: any) => props.onFailure(error),
      );
    }
  });

  /* istanbul ignore next */
  const signOut = ((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event) {
      event.preventDefault();
    }
    if (loaded) {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(
        auth2.disconnect().then(props.onSignOutSuccess),
      );
    }
  });

  return { signIn, signOut };
};

export default googleHandler;
