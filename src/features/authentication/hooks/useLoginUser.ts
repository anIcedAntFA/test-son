import { useMutation } from '@tanstack/react-query';

import { AuthenticationAPI, IAuthentication, IUser } from 'src/features/authentication';

interface ILoginUser {
  onSuccess?: (authData: IAuthentication) => void;
  onError?: (error: any) => void;
}

function useLoginUser({ onSuccess, onError }: ILoginUser = {}) {
  const authenticationAPI = AuthenticationAPI.getInstance();

  const loginUserMutation = useMutation({
    mutationFn: (userAuthenticate: Pick<IUser, 'email' | 'password'>) => {
      return authenticationAPI.loginUser(userAuthenticate);
    },
    onSuccess: (authData) => {
      onSuccess?.(authData);
    },
    onError: (error: any) => {
      onError?.(error);
    },
  });

  return loginUserMutation;
}

export default useLoginUser;
