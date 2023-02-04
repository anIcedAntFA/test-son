import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthentication } from 'src/hooks';
import { EUserRole } from 'src/types';

export interface IAdminMiddleware {
  children: ReactNode;
}

function AdminMiddleware({ children }: IAdminMiddleware) {
  const { authentication } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    if (!authentication?.isAuthenticated && authentication?.simpleUser.role !== EUserRole.admin) {
      return <h1>Permission Denied</h1>;
    }
  }, [authentication?.isAuthenticated, authentication?.simpleUser]);

  return <>{children}</>;
}

export default AdminMiddleware;
