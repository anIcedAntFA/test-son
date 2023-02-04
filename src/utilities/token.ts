import { getLocalStorage } from './localStorage';

export const getToken = () => {
  const authentication = getLocalStorage('authentication');

  return authentication?.accessToken;
};
