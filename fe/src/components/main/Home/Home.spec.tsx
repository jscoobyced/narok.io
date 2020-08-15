import { mount } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { Home } from './Home';
import { mountComponent } from '../../jestUtil';
import { User } from '../../../models/User';
import { AuthenticationHandler } from '../../../services/auth/handler';
import UserServiceMock from '../../../services/auth/user.mock';
import DataServiceMock from '../../../services/data/data.mock';

const owner: User = { id: 12345678, name: 'Administrator' };

const handler = new AuthenticationHandler();
const userService = new UserServiceMock();

describe('Home', () => {
  it('should display all elements.', async () => {
    let home = mount(<></>);
    const dataService = new DataServiceMock(false);
    await act(async () => {
      home = mountComponent(<Home
        dataService={dataService}
        handler={handler}
        userService={userService}
      />);
    });
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
  });

  it('should display all elements when no data.', async () => {
    let home = mount(<></>);
    const dataService = new DataServiceMock(false);
    await act(async () => {
      home = mountComponent(<Home
        dataService={dataService}
        handler={handler}
        userService={userService}
      />);
    });
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
  });
});
