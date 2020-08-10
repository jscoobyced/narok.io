import * as React from 'react';
import { shallow } from 'enzyme';
import { SimpleEditor, handleKeyPress, defaultButtonText } from './SimpleEditor';

jest.mock('./editorCommands', () => ({
  isCommandSupported: () => true,
  executeCommand: (command: string, value: any) => true,
}));

describe('SimpleEditor', () => {
  it('should display default UI', () => {
    const buttonText = defaultButtonText;

    const editor = shallow(<SimpleEditor
      buttonText={buttonText}
    />);
    const buttons = editor.find('.jscSimpleEditor').first().children();
    expect(buttons).toHaveLength(11);
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
