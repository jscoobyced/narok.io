import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Home } from './home';
import HttpService from '../../services/http/http';

jest.mock('../../services/http/http');

beforeEach(() => {
  (HttpService.fetchData as jest.Mock).mockReturnValue({});
});

describe('Home', () => {
  it('should display all elements.', async () => {
    const home = shallow(<Home />);
    expect(home.find('header')).toHaveLength(1);
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
    expect(home.find('footer')).toHaveLength(1);
  });

  it('should handle error to fetch data', async () => {
    const error = 'Async error';
    (HttpService.fetchData as jest.Mock).mockRejectedValue(new Error(error));
    const home = mount(<Home />);
    (home.instance() as Home).componentDidMount()
      .then(() => {
        expect(home.state('hello')).toEqual(error);
      });
  });
});
