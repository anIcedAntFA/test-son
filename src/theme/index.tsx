import {
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
  createTheme,
} from '@mui/material';
import { ReactNode, useMemo } from 'react';

import { useThemeSetting } from 'src/hooks';
import { EThemeMode } from 'src/types';
import breakpoints from './breakpoint';
import paletteMode from './pallette';

type ThemeProviderProps = {
  children: ReactNode;
};

function MuiThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode } = useThemeSetting();

  const isLight: boolean = themeMode === EThemeMode.light;

  const themeOption: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? paletteMode.light : paletteMode.dark,
      breakpoints: breakpoints,
      shape: {
        borderRadius: 8,
      },
    }),
    [isLight],
  );

  const myTheme = createTheme(themeOption);

  return (
    <>
      <MUIThemeProvider theme={myTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </>
  );
}

export default MuiThemeProvider;
