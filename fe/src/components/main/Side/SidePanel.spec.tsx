import * as React from 'react';
import { SidePanel } from './SidePanel';
import { mountComponent } from '../../jestUtil';

describe('SidePanel', () => {
  it('should display properly', () => {
    const sidePanel = mountComponent(<SidePanel />);
    expect(sidePanel.find('span')).toHaveLength(6);
    expect(sidePanel.find('a.input.button')).toHaveLength(0);
  });

  it('should display  \'New Article\' button', () => {
    const sidePanel = mountComponent(<SidePanel />, undefined, undefined, '123456789');
    expect(sidePanel.find('a.input.button')).toHaveLength(1);
  });
});
