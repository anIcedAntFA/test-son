import { IconButton } from '@mui/material';

import { MyTooltip } from 'src/components/ui';
import { Brightness2Icon, Brightness7Icon } from 'src/components/ui/Icons';
import { THEME_MODES } from 'src/configs';
import { useThemeSetting } from 'src/hooks';
import { EThemeMode } from 'src/types';

function ThemeMode() {
  const { themeMode, handleChangeTheme } = useThemeSetting();

  const isLight = themeMode === EThemeMode.light;

  const handleToggleChangeTheme = () => {
    themeMode === EThemeMode.dark
      ? handleChangeTheme(EThemeMode.light)
      : handleChangeTheme(EThemeMode.dark);
  };

  return (
    <MyTooltip title={isLight ? THEME_MODES.LIGHT_MODE : THEME_MODES.DARK_MODE}>
      <IconButton color="inherit" onClick={handleToggleChangeTheme}>
        {isLight ? <Brightness7Icon fontSize="large" /> : <Brightness2Icon fontSize="large" />}
      </IconButton>
    </MyTooltip>
  );
}

export default ThemeMode;
