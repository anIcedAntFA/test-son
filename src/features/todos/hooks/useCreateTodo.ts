import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ITodo, TodoAPI } from 'src/features/todos';
import { IdType } from 'src/utilities';

interface IUseCreateTodo {
  onSuccess?: (id: IdType, newTodo: Omit<ITodo, 'id' | 'user' | 'createdAt' | 'updatedAt'>) => void;
}

function useCreateTodo({ onSuccess }: IUseCreateTodo = {}) {
  const todoAPI = TodoAPI.getInstance();

  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: (newTodo: Omit<ITodo, 'id' | 'user' | 'createdAt' | 'updatedAt'>) => {
      return todoAPI.createTodo(newTodo);
    },
    onSuccess: (id, newTodo) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      onSuccess?.(id, newTodo);
    },
  });

  return createTodoMutation;
}

export default useCreateTodo;
