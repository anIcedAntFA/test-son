export const convertStringToBooleanImportant = (text: string) => {
  switch (text) {
    case 'isImportant':
      return true;
    case 'notImportant':
      return false;
    default:
      return undefined;
  }
};
