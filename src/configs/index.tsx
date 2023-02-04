import {
  GolangLogoIcon,
  MuiLogoIcon,
  MySQLLogoIcon,
  ReactLogoIcon,
  ReactQueryLogoIcon,
  TypescriptLogoIcon,
} from 'src/components/ui';
import { ADMIN, AUTH, DARK, LIGHT, LOGIN, REGISTER, USERS } from 'src/constants';
import { ToastMessageType } from 'src/types';

export const ROUTES = {
  ADMIN: `/${ADMIN}`,
  AUTH: `/${AUTH}`,
  REGISTER: REGISTER,
  LOGIN: LOGIN,
  USERS: USERS,
  HOME: '/',
};

export const THEME_MODES = {
  LIGHT_MODE: `${LIGHT[0].toUpperCase()}${LIGHT.substring(1)} Mode`,
  DARK_MODE: `${DARK[0].toUpperCase()}${DARK.substring(1)} Mode`,
};

export const TOAST_OPTIONS: ToastMessageType = {
  pauseOnHover: true,
  bodyClassName: 'toast',
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  rtl: false,
  // limit: 4,
};

interface IIconsList {
  title: string;
  color: string;
  icon: JSX.Element;
  path: string;
}

export const FOOTER_ICONS_LIST: IIconsList[] = [
  {
    title: 'ReactJs',
    color: '#61DBFB',
    icon: <ReactLogoIcon />,
    path: '',
  },
  {
    title: 'Typescript',
    color: '#007acc',
    icon: <TypescriptLogoIcon />,
    path: '',
  },
  {
    title: 'Golang',
    color: '#29BEB0',
    icon: <GolangLogoIcon />,
    path: '',
  },
  {
    title: 'MaterialUI',
    color: '#007fff',
    icon: <MuiLogoIcon />,
    path: '',
  },
  {
    title: 'Tanstack Query',
    color: '#ff4154',
    icon: <ReactQueryLogoIcon />,
    path: '',
  },
  {
    title: 'MySQL',
    color: '#F29111',
    icon: <MySQLLogoIcon />,
    path: '',
  },
];
