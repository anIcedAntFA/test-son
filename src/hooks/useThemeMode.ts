import { useContext } from 'react';
import { ThemeModeContext } from 'src/contexts/ThemeModeContext';

function useThemeMode() {
  const { themeMode, handleChangeTheme } = useContext(ThemeModeContext);

  return { themeMode, handleChangeTheme };
}

export default useThemeMode;
