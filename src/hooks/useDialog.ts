import { useContext } from 'react';

import { DialogContext } from 'src/contexts/DialogContext';

function useDialog() {
  const {
    openFormDialog,
    confirmDeleteDialog,
    setOpenFormDialog,
    setConfirmDeleteDialog,
    hideAllDialog,
  } = useContext(DialogContext);

  return {
    openFormDialog,
    confirmDeleteDialog,
    setOpenFormDialog,
    setConfirmDeleteDialog,
    hideAllDialog,
  };
}

export default useDialog;
