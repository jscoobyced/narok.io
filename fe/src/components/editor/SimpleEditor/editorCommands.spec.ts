import { executeCommand } from './editorCommands';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

document.execCommand = jest.fn();

describe('editorCommands', () => {
  it('should execute a supported command.', () => {
    jest.resetAllMocks();
    document.queryCommandSupported = jest.fn(() => true);
    executeCommand('bold', '');
    expect(document.execCommand).toHaveBeenCalledTimes(1);
  });

  it('should not execute a unsupported command.', () => {
    jest.resetAllMocks();
    document.queryCommandSupported = jest.fn(() => false);
    executeCommand('bold', '', true);
    expect(document.execCommand).toHaveBeenCalledTimes(0);
  });
});
