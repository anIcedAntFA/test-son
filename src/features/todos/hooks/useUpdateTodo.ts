import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ITodo, TodoAPI } from 'src/features/todos';
import { IdType } from 'src/utilities';

interface IUseUpdateTodo {
  onSuccess?: (isSuccess: boolean, updatedData: IUpdateData) => void;
}

interface IUpdateData {
  id: IdType;
  data: Omit<ITodo, 'id' | 'user' | 'createdAt' | 'updatedAt'>;
}

function useUpdateTodo({ onSuccess }: IUseUpdateTodo = {}) {
  const todoAPI = TodoAPI.getInstance();

  const queryClient = useQueryClient();

  const updateTodoMution = useMutation({
    mutationFn({ id, data }: IUpdateData) {
      return todoAPI.updateTodo(id, data);
    },
    onSuccess(isSuccess, updatedData) {
      queryClient.setQueryData(['todo', updatedData], isSuccess);
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      onSuccess?.(isSuccess, updatedData);
    },
  });

  return updateTodoMution;
}

export default useUpdateTodo;
