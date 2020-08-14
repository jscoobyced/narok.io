import { SecureUser, toSecureUser } from '../../../models/User';
import { UserService } from '../../../services/auth/user';

export default class GoogleUserService implements UserService {
    public createUser = (googleUser: gapi.auth2.GoogleUser): SecureUser => {
      const user = googleUser.getBasicProfile();
      const auth = googleUser.getAuthResponse();
      return toSecureUser(0, user.getName(), user.getEmail(), user.getId(), auth.id_token, auth.scope,
        auth.expires_in, auth.expires_at);
    };
}
