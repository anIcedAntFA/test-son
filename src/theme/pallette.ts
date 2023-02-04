import { PaletteOptions } from '@mui/material';

interface IColor {
  lighter?: string;
  light: string;
  main: string;
  dark: string;
  darker?: string;
}

interface IPallette {
  light: PaletteOptions;
  dark: PaletteOptions;
}

export const primary: IColor = {
  light: '#ff4081',
  main: '#f50057',
  dark: '#c51162',
};

export const secondary: IColor = {
  lighter: '#D6E4FF',
  light: '#7c4dff',
  main: '#651fff',
  dark: '#6200ea',
  darker: '#091A7A',
};
export const info: IColor = {
  lighter: '#D0F2FF',
  light: '#40c4ff',
  main: '#00b0ff',
  dark: '#0091ea',
  darker: '#04297A',
};
export const success: IColor = {
  lighter: '#E9FCD4',
  light: '#69f0ae',
  main: '#00e676',
  dark: '#229A16',
  darker: '#00c853',
};
export const warning: IColor = {
  lighter: '#FFF7CD',
  light: '#ffab40',
  main: '#ff9100',
  dark: '#ff6d00',
  darker: '#7A4F01',
};
export const error: IColor = {
  lighter: '#FFE7D9',
  light: '#ff5252',
  main: '#ff1744',
  dark: '#d50000',
  darker: '#7A0C2E',
};

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const palette: PaletteOptions = {
  common: {
    black: '#000',
    white: '#FFF',
  },
  primary: {
    ...primary,
    contrastText: '#FFF',
  },
  secondary: {
    ...secondary,
    contrastText: '#FFF',
  },
  success: {
    ...success,
    contrastText: grey[800],
  },
  error: {
    ...error,
    contrastText: grey[800],
  },
  warning: {
    ...warning,
    contrastText: '#FFF',
  },
  info: {
    ...info,
    contrastText: '#FFF',
  },
  grey: grey,
};

const paletteMode: IPallette = {
  light: {
    ...palette,
    mode: 'light',
    text: { primary: grey[800], secondary: grey[600], disabled: grey[500] },
    background: { paper: '#fff', default: '#fff' },
    action: {
      ...palette.action,
      active: grey[600],
    },
  },
  dark: {
    ...palette,
    mode: 'dark',
    text: { primary: '#fff', secondary: grey[500], disabled: grey[600] },
    background: { paper: grey[800], default: grey[900] },
    action: {
      ...palette.action,
      active: grey[500],
    },
  },
};

export default paletteMode;
