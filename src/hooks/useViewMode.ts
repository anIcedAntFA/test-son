import { useContext } from 'react';

import { ViewModeContext } from 'src/contexts/ViewModeContext';

function useViewMode() {
  const { viewMode, setViewMode, resetViewMode } = useContext(ViewModeContext);

  return { viewMode, setViewMode, resetViewMode };
}

export default useViewMode;
