const isCommandSupported = (command: string) => !!document.queryCommandSupported(command);

export const executeCommand = (command: string, value: any) => {
  if (isCommandSupported(command)) { document.execCommand(command, false, (value || '')); }
};
