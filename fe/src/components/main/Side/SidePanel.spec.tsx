import * as React from 'react';
import { SidePanel } from './SidePanel';
import { mountComponent } from '../../jestUtil';

describe('SidePanel', () => {
    it('should display properly', () => {
        const sidePanel = mountComponent(<SidePanel />);
        expect(sidePanel.find('span')).toHaveLength(5);
    });
});
