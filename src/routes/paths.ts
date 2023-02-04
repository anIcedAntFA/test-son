import { ROUTES } from 'src/configs';
import { generatePaths } from 'src/utilities';

const ROOT_ADMIN = ROUTES.ADMIN;

const ROOT_AUTH = ROUTES.AUTH;

const ROOT_PAGE = ROUTES.HOME;

export const PATH_ADMIN = {
  ROOT: ROOT_ADMIN,
  USERS: generatePaths(ROOT_ADMIN, ROUTES.USERS),
};

export const PATH_AUTH = {
  ROOT: ROOT_AUTH,
  REGISTER: generatePaths(ROOT_AUTH, ROUTES.REGISTER),
  LOGIN: generatePaths(ROOT_AUTH, ROUTES.LOGIN),
};

export const PATH_PAGE = {
  ROOT: ROOT_PAGE,
};
