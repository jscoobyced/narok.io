import { mount } from 'enzyme';
import * as React from 'react';
import { Home } from './Home';
import HttpService from '../../services/http/http';

jest.mock('../../services/http/http');

beforeEach(() => {
  (HttpService.fetchData as jest.Mock).mockReturnValue({});
});

describe('Home', () => {
  it('should display all elements.', async () => {
    const home = mount(<Home />);
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
  });
});
