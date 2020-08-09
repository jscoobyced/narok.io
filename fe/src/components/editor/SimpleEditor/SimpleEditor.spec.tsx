import * as React from 'react';
import { shallow } from 'enzyme';
import { SimpleEditor, handleKeyPress } from './SimpleEditor';

jest.mock('./editorCommands', () => ({
  isCommandSupported: () => true,
  executeCommand: (command: string, value: any) => true,
}));

describe('SimpleEditor', () => {
  it('should display default UI', () => {
    const buttonText = {
      boldText: 'Bold',
      italicText: 'Italic',
      decreaseFontSizeText: 'Decrease',
      increaseFontSizeText: 'Increase',
      orderedListText: 'Ordered',
      unorderedListText: 'Unordered',
      justifyLeftText: 'Left',
      justifyCenterText: 'Center',
      justifyFullText: 'Full',
      justifyRightText: 'Right',
    };

    const editor = shallow(<SimpleEditor
      buttonText={buttonText}
    />);
    const buttons = editor.find('.jscSimpleEditor').first().children();
    expect(buttons).toHaveLength(10);
    buttons.forEach(span => {
      span.simulate('click', {
        preventDefault: () => { },
      });
      span.simulate('mousedown', {
        preventDefault: () => { },
      });
      span.simulate('keypress', {
        keyCode: 13,
        preventDefault: () => { },
      });
    });
  });

  it('should expose handleKeyPress', () => {
    const preventDefault = jest.fn();
    const spanComponent = (
      <span
        role="button"
        tabIndex={-1}
        onKeyPress={handleKeyPress}
      >
        Whatever
      </span>
    );
    const span = shallow(spanComponent);
    span.simulate('keypress', {
      keyCode: 13,
      preventDefault,
    });
    span.simulate('keypress', {
      which: 13,
      preventDefault,
    });
    span.simulate('keypress', {
      keyCode: 48,
      preventDefault,
    });
    expect(preventDefault).toHaveBeenCalledTimes(2);
  });
});
