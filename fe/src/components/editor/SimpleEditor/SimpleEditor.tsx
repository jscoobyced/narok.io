import * as React from 'react';
import { executeCommand } from './editorCommands';
import './SimpleEditor.scss';

export const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
  if (event && (event.keyCode === 13 || event.which === 13)) {
    event.preventDefault();
    executeCommand('insertHTML', '<br />&nbsp;&nbsp;&nbsp;&nbsp;');
  }
};

export interface SimpleEditorText {
  boldText: string,
  italicText: string,
  decreaseFontSizeText: string,
  increaseFontSizeText: string,
  orderedListText: string,
  unorderedListText: string,
  justifyLeftText: string,
  justifyCenterText: string,
  justifyFullText: string,
  justifyRightText: string
}

export const SimpleEditor = (props: { buttonText: SimpleEditorText }) => {
  const { buttonText } = props;
  const {
    boldText,
    italicText,
    decreaseFontSizeText,
    increaseFontSizeText,
    orderedListText,
    unorderedListText,
    justifyLeftText,
    justifyCenterText,
    justifyFullText,
    justifyRightText,
  } = buttonText;
  const [fontSize, setFontSize] = React.useState(3);

  const changeFontSize = (event: React.MouseEvent<HTMLElement>, value: number) => {
    event.preventDefault();
    const newSize = fontSize + value;
    if (newSize > 0 && newSize < 8) {
      executeCommand('fontSize', newSize);
      setFontSize(newSize);
    }
  };

  const disableMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const disableOnKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const doBoldCommand = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('bold', '');
  };

  const doItalicCommand = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('italic', '');
  };

  const doDecreaseFontSizeCommand = (event: React.MouseEvent<HTMLElement>) => {
    changeFontSize(event, -1);
  };

  const doIncreaseFontSizeCommand = (event: React.MouseEvent<HTMLElement>) => {
    changeFontSize(event, 1);
  };

  const doOrderedListCommand = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('insertOrderedList', '');
  };

  const doUnorderedListCommand = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('insertUnorderedList', '');
  };

  const doJustifyLeft = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('justifyLeft', '');
  };

  const doJustifyCenter = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('justifyCenter', '');
  };

  const doJustifyFull = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('justifyFull', '');
  };

  const doJustifyRight = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('justifyRight', '');
  };

  return (
    <div className="jscSimpleEditor">
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={boldText}
        onClick={doBoldCommand}
      >
        <i className="fas fa-bold" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={italicText}
        onClick={doItalicCommand}
      >
        <i className="fas fa-italic" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={decreaseFontSizeText}
        onClick={doDecreaseFontSizeCommand}
      >
        <i className="fas fa-decrease" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={increaseFontSizeText}
        onClick={doIncreaseFontSizeCommand}
      >
        <i className="fas fa-increase" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={orderedListText}
        onClick={doOrderedListCommand}
      >
        <i className="fas fa-ordered" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={unorderedListText}
        onClick={doUnorderedListCommand}
      >
        <i className="fas fa-unordered" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyLeftText}
        onClick={doJustifyLeft}
      >
        <i className="fas fa-just-left" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyCenterText}
        onClick={doJustifyCenter}
      >
        <i className="fas fa-just-center" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyFullText}
        onClick={doJustifyFull}
      >
        <i className="fas fa-just-full" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        className="button"
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyRightText}
        onClick={doJustifyRight}
      >
        <i className="fas fa-just-right" />
      </span>
    </div>
  );
};
