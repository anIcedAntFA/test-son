import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TodoAPI } from 'src/features/todos';
import { IdType } from 'src/types';

interface IUseDeleteOneTodo {
  onSuccess?: (ids: IdType[]) => void;
  onError?: (error: any) => void;
}

function useDeleteManyTodos({ onSuccess, onError }: IUseDeleteOneTodo = {}) {
  const todoAPI = TodoAPI.getInstance();

  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: (ids: IdType[]) => todoAPI.deleteManyTodos(ids),
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

export default useDeleteManyTodos;
