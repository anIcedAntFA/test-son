import { EFormMode } from 'src/types';

export const formModeProvider = {
  [EFormMode.add]: () => 'Add Todo Form',
  [EFormMode.preview]: () => 'Preview Todo Form',
  [EFormMode.edit]: () => 'Edit Todo Form',
};

export const getFormTitle = (variant: EFormMode) => {
  return formModeProvider[variant];
};
