import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodoAPI } from 'src/features/todos';
import { IdType } from 'src/types';

interface IUseDeleteOneTodo {
  onSuccess?: (id: IdType) => void;
  onError?: (error: any) => void;
}

function useDeleteOneTodo({ onSuccess, onError }: IUseDeleteOneTodo = {}) {
  const todoAPI = TodoAPI.getInstance();

  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: (id: IdType) => todoAPI.deleteOneTodo(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      onSuccess?.(id);
    },
    onError: (error: any) => {
      onError?.(error);
    },
  });

  return deleteTodoMutation;
}

export default useDeleteOneTodo;
