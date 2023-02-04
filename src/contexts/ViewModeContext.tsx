import { Dispatch, ReactNode, createContext, useState } from 'react';

import { EViewMode } from 'src/types';

interface IViewModeProviderProps {
  children: ReactNode;
}

interface IInitialViewModeState {
  viewMode: EViewMode;
  setViewMode: Dispatch<React.SetStateAction<EViewMode>>;
  resetViewMode: () => void;
}

const initialViewModeContext: IInitialViewModeState = {
  viewMode: EViewMode.table,
  setViewMode() {},
  resetViewMode() {},
};

const initialViewModeValue = EViewMode.table;

export const ViewModeContext = createContext(initialViewModeContext);

function ViewModeContextProvider({ children }: IViewModeProviderProps) {
  const [viewMode, setViewMode] = useState<EViewMode>(initialViewModeValue);

  const resetViewMode = () => {
    setViewMode(initialViewModeValue);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, resetViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export default ViewModeContextProvider;
