import { SecureUser } from '../../models/User';

export interface UserService {
    createUser: (user: any) => SecureUser;
}
