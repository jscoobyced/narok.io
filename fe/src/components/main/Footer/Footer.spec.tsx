import * as React from 'react';
import { Footer } from './Footer';
import { mountComponent } from '../../jestUtil';

describe('Home', () => {
  it('should display properly', () => {
    const footer = mountComponent(<Footer />);
    expect(footer.find('footer')).toHaveLength(1);
  });
});
