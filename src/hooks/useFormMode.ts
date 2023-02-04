import { useContext } from 'react';

import { FormModeContext } from 'src/contexts/FormModeContext';

function useFormMode() {
  const { formMode, setFormMode, resetFormMode } = useContext(FormModeContext);

  return { formMode, setFormMode, resetFormMode };
}

export default useFormMode;
