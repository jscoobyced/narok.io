import * as React from 'react';
import { executeCommand } from './editorCommands';
import { Button } from '../../common/Button';
import './SimpleEditor.scss';

export const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): boolean => {
  if (event && (event.keyCode === 13 || event.which === 13)) {
    event.preventDefault();
    executeCommand('insertHTML', '<br />&nbsp;&nbsp;&nbsp;&nbsp;');
    return false;
  }
  return true;
};

export interface SimpleEditorText {
  boldText: string,
  italicText: string,
  strikeThroughText: string,
  decreaseFontSizeText: string,
  increaseFontSizeText: string,
  orderedListText: string,
  unorderedListText: string,
  justifyLeftText: string,
  justifyCenterText: string,
  justifyFullText: string,
  justifyRightText: string,
  createLinkText: string
}

export const defaultButtonText = {
  boldText: 'bold',
  italicText: 'italic',
  strikeThroughText: 'strike through',
  decreaseFontSizeText: 'decrease',
  increaseFontSizeText: 'increase',
  orderedListText: 'ordered',
  unorderedListText: 'unordered',
  justifyLeftText: 'left',
  justifyCenterText: 'center',
  justifyFullText: 'justify',
  justifyRightText: 'right',
  createLinkText: 'Create Link',
};

export const SimpleEditor = (props: { buttonText: SimpleEditorText }) => {
  const { buttonText } = props;
  const {
    boldText,
    italicText,
    strikeThroughText,
    decreaseFontSizeText,
    increaseFontSizeText,
    orderedListText,
    unorderedListText,
    justifyLeftText,
    justifyCenterText,
    justifyFullText,
    justifyRightText,
    createLinkText,
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

  const doStrikeThroughCommand = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    executeCommand('strikeThrough', '');
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

  const createLink = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    /* eslint-disable no-alert */
    const linkUrl = prompt(createLinkText);
    /* eslint-enable no-alert */
    executeCommand('createLink', linkUrl);
  };

  return (
    <div className="jscSimpleEditor">
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={boldText}
        onClick={doBoldCommand}
      >
        <i className="fas fa-bold" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={italicText}
        onClick={doItalicCommand}
      >
        <i className="fas fa-italic" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={strikeThroughText}
        onClick={doStrikeThroughCommand}
      >
        <i className="fas fa-strike" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={decreaseFontSizeText}
        onClick={doDecreaseFontSizeCommand}
      >
        <i className="fas fa-decrease" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={increaseFontSizeText}
        onClick={doIncreaseFontSizeCommand}
      >
        <i className="fas fa-increase" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={orderedListText}
        onClick={doOrderedListCommand}
      >
        <i className="fas fa-ordered" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={unorderedListText}
        onClick={doUnorderedListCommand}
      >
        <i className="fas fa-unordered" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyLeftText}
        onClick={doJustifyLeft}
      >
        <i className="fas fa-just-left" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyCenterText}
        onClick={doJustifyCenter}
      >
        <i className="fas fa-just-center" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyFullText}
        onClick={doJustifyFull}
      >
        <i className="fas fa-just-full" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={justifyRightText}
        onClick={doJustifyRight}
      >
        <i className="fas fa-just-right" />
      </Button>
      <Button
        onMouseDown={disableMouseDown}
        onKeyPress={disableOnKeyPress}
        title={createLinkText}
        onClick={createLink}
      >
        <i className="fas fa-link" />
      </Button>
    </div>
  );
};
