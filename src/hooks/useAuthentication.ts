import { useContext } from 'react';

import { AuthenticationContext } from 'src/contexts/AuthenticationContext';

function useAuthentication() {
  const { authentication, handleUpdateAuthentication } = useContext(AuthenticationContext);

  return { authentication, handleUpdateAuthentication };
}

export default useAuthentication;
