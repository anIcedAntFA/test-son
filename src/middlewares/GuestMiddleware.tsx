import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthentication } from 'src/hooks';
import { PATH_PAGE } from 'src/routes/paths';

export interface IGuestMiddleware {
  children: ReactNode;
}

function GuestMiddleware({ children }: IGuestMiddleware) {
  const { authentication } = useAuthentication();

  const isAuthenticated = authentication?.isAuthenticated;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_PAGE.ROOT);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}

export default GuestMiddleware;
