import { mount } from 'enzyme';
import * as React from 'react';
import { AuthenticationHandler } from '../auth/handler';
import { SecureUser, newSecureUser } from '../../models/User';
import { AppContext } from './context';
import DataServiceMock from '../data/data.mock';

const Empty = () => {
  const context = React.useContext(AppContext);
  const { language } = context;
  return (
    <div className="test">{language}</div>
  );
};

describe('context service', () => {
  it('should contain current language', () => {
    const expected = 'en_US';
    const dataService = new DataServiceMock(false);
    const component = mount(
      <AppContext.Provider value={{
        language: expected,
        setLanguage: () => { },
        getContent: (s: string) => '',
        dataService,
        handler: new AuthenticationHandler(),
        user: newSecureUser(),
        setUser: (user: SecureUser) => { },
        createUser: (user: any) => newSecureUser(),
      }}
      >
        <Empty />
      </AppContext.Provider>,
    );
    const div = component.find('.test');
    expect(div).toHaveLength(1);
    expect(div.first().text()).toEqual(expected);
  });
});
