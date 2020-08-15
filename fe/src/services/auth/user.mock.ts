import { SecureUser, toSecureUser } from '../../models/User';
import { UserService } from './user';

export default class UserServiceMock implements UserService {
  public createUser = (user: any): SecureUser => toSecureUser(
    1,
    'Administrator',
    '',
    '123456789',
    'blebleble',
    '',
    0,
    0,
  );
}
