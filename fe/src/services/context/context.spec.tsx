import { mount } from 'enzyme';
import * as React from 'react';
import { SecureUser, newSecureUser } from '../../authentication/models/User';
import HttpServiceMock from '../http/http.mock';
import { AppContext } from './context';
import DataService from '../data/data';

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
    const dataService = new DataService('development', new HttpServiceMock({}));
    const component = mount(
      <AppContext.Provider value={{
        language: expected,
        setLanguage: () => { },
        getContent: (s: string) => '',
        dataService,
        user: newSecureUser(),
        setUser: (user: SecureUser) => { },
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
