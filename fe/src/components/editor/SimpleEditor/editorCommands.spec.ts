import { executeCommand } from './editorCommands';

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
    executeCommand('bold', '');
    expect(document.execCommand).toHaveBeenCalledTimes(0);
  });
});
