import { SecureUser, toSecureUser } from '../../../models/User';
import { UserService } from '../../../services/auth/user';

export default class GoogleUserService implements UserService {
    public createUser = (googleUser: gapi.auth2.GoogleUser): SecureUser => {
      const user = googleUser.getBasicProfile();
      const auth = googleUser.getAuthResponse();
      return toSecureUser(user.getId(), user.getName(), user.getGivenName(),
        user.getFamilyName(), user.getEmail(), auth.id_token, auth.scope,
        user.getImageUrl(), auth.expires_in, auth.expires_at);
    };
}
