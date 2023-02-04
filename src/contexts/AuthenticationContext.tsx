import { ReactNode, createContext, useEffect } from 'react';

import { IAuthentication } from 'src/features/authentication';
import { useLocalStorage } from 'src/hooks';
import { EUserRole } from 'src/types';

interface StateContextProviderProps {
  children: ReactNode;
}

type NullableAuthentication = IAuthentication | null;

interface IAuthenticationContext {
  authentication: NullableAuthentication;
  handleUpdateAuthentication: (authData: IAuthentication) => void;
}

export const initialAuthentication: IAuthentication = {
  simpleUser: {
    id: '',
    firstName: '',
    lastName: '',
    role: EUserRole.user,
    status: 1,
  },
  accessToken: '',
  isAuthenticated: false,
};

const initialAuthenticationContext = {
  authentication: initialAuthentication,
  handleUpdateAuthentication() {},
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  initialAuthenticationContext,
);

function AuthenticationContextProvider({ children }: StateContextProviderProps) {
  const [authentication, setAuthentication] = useLocalStorage<NullableAuthentication>(
    'authentication',
    null,
  );

  const handleUpdateAuthentication = (authData: IAuthentication) => {
    setAuthentication(authData);
  };

  useEffect(() => {
    setAuthentication(authentication);
  }, [authentication]);

  return (
    <AuthenticationContext.Provider value={{ authentication, handleUpdateAuthentication }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;
