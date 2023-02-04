import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthenticationAPI, IUser } from 'src/features/authentication';

interface IRegisterUser {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

function useRegisterUser({ onSuccess, onError }: IRegisterUser = {}) {
  const authenticationAPI = AuthenticationAPI.getInstance();

  const queryClient = useQueryClient();

  const registerUserMutation = useMutation({
    mutationFn: (newUser: Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>) => {
      return authenticationAPI.registerUser(newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      onSuccess?.();
    },
    onError: (error: any) => {
      onError?.(error);
    },
  });

  return registerUserMutation;
}

export default useRegisterUser;
