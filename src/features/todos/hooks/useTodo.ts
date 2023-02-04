import { useQuery } from '@tanstack/react-query';

import { ITodo, TodoAPI } from 'src/features/todos';
import { IdType } from 'src/utilities';

function useTodo(id: IdType) {
  const todoAPI = TodoAPI.getInstance();

  const { data } = useQuery<ITodo>({
    queryKey: ['todo', id],
    queryFn: () => todoAPI.getTodo(id),
    enabled: !!id, //all falsy case ; id !== undefined => undefined
  });

  return { data };
}

export default useTodo;
