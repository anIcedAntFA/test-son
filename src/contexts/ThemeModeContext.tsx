import { ReactNode, createContext, useEffect } from 'react';

import useLocalStorage from 'src/hooks/useLocalStorage';
import { EThemeMode } from 'src/types';

interface IInitialThemeModeState {
  themeMode: EThemeMode;
  handleChangeTheme: (mode: EThemeMode) => void;
}

interface IThemeModeProviderProps {
  children: ReactNode;
}

const initialThemeModeState: IInitialThemeModeState = {
  themeMode: EThemeMode.light,
  handleChangeTheme: () => {},
};

export const ThemeModeContext = createContext(initialThemeModeState);

function ThemeModeContextProvider({ children }: IThemeModeProviderProps) {
  const [themeMode, setThemeMode] = useLocalStorage<EThemeMode>('theme-mode', EThemeMode.light);

  const handleChangeTheme = (mode: EThemeMode) => {
    setThemeMode(mode);
  };

  useEffect(() => setThemeMode(themeMode), [themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, handleChangeTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export default ThemeModeContextProvider;
