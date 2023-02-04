import { Dispatch, ReactNode, createContext, useState } from 'react';

import { EFormMode } from 'src/types';

interface IFormModeProviderProps {
  children: ReactNode;
}

interface IInitialFormModeState {
  formMode: EFormMode;
  setFormMode: Dispatch<React.SetStateAction<EFormMode>>;
  resetFormMode: () => void;
}

const initialFormModeContext: IInitialFormModeState = {
  formMode: EFormMode.add,
  setFormMode() {},
  resetFormMode() {},
};

const initialFormModeValue = EFormMode.add;

export const FormModeContext = createContext(initialFormModeContext);

function FormModeContextProvider({ children }: IFormModeProviderProps) {
  const [formMode, setFormMode] = useState<EFormMode>(initialFormModeValue);

  const resetFormMode = () => {
    setFormMode(initialFormModeValue);
  };

  return (
    <FormModeContext.Provider value={{ formMode, setFormMode, resetFormMode }}>
      {children}
    </FormModeContext.Provider>
  );
}

export default FormModeContextProvider;
