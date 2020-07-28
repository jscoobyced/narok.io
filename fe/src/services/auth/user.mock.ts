import { SecureUser, toSecureUser } from '../../models/User';
import { UserService } from './user';

export default class UserServiceMock implements UserService {
  public createUser = (user: any): SecureUser => toSecureUser(
    '123456789',
    'Administrator',
    '',
    '',
    '',
    '',
    '',
    '',
    0,
    0,
  );
}
