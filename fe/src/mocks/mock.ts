import UserServiceMock from '../services/auth/user.mock';
import { UserService } from '../services/auth/user';
import DataServiceMock from '../services/data/data.mock';

export const dataServiceMock = (): DataServiceMock => new DataServiceMock(null);

export const userServiceMock = (): UserService => new UserServiceMock();
