import { Dispatch, ReactNode, createContext, useState } from 'react';

import { EConfirmDelete } from 'src/types';

interface IDialogProviderProps {
  children: ReactNode;
}

interface IInitialDialogState {
  openFormDialog: boolean;
  confirmDeleteDialog: EConfirmDelete | undefined;
  setOpenFormDialog: Dispatch<React.SetStateAction<boolean>>;
  setConfirmDeleteDialog: Dispatch<React.SetStateAction<EConfirmDelete | undefined>>;
  hideAllDialog: () => void;
}

const initialDialogState: IInitialDialogState = {
  openFormDialog: false,
  confirmDeleteDialog: undefined,
  setOpenFormDialog() {},
  setConfirmDeleteDialog() {},
  hideAllDialog() {},
};

export const DialogContext = createContext(initialDialogState);

function DialogContextProvider({ children }: IDialogProviderProps) {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<EConfirmDelete | undefined>(
    undefined,
  );

  const hideAllDialog = () => {
    setOpenFormDialog(false);
    setConfirmDeleteDialog(undefined); //set fix height for dialog
  };

  return (
    <DialogContext.Provider
      value={{
        openFormDialog,
        confirmDeleteDialog,
        setOpenFormDialog,
        setConfirmDeleteDialog,
        hideAllDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export default DialogContextProvider;
