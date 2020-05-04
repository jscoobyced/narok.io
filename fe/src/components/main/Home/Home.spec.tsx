import { mount } from 'enzyme';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { Home } from './Home';
import HttpService from '../../../services/http/http';
import { mountComponent } from '../../jestUtil';

jest.mock('../../../services/http/http');

beforeEach(() => {
  (HttpService.fetchData as jest.Mock).mockReturnValue({});
});

describe('Home', () => {
  it('should display all elements.', async () => {
    let home = mount(<></>);
    await act(async () => {
      home = mountComponent(<Home />);
    });
    expect(home.find('.container')).toHaveLength(1);
    expect(home.find('section')).toHaveLength(1);
  });
});
