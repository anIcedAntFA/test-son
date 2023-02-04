import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthentication } from 'src/hooks';
import { PATH_AUTH } from 'src/routes/paths';

export interface IAuthenticationMiddleware {
  children: ReactNode;
}

function AuthenticationMiddleware({ children }: IAuthenticationMiddleware) {
  const { authentication } = useAuthentication();

  const isAuthenticated = authentication?.isAuthenticated;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.LOGIN);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}

export default AuthenticationMiddleware;
