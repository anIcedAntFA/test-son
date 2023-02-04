import { useQuery } from '@tanstack/react-query';

import { ITodoQueryParams, TodoAPI } from 'src/features/todos';

function useTodos(options: ITodoQueryParams) {
  const todoAPI = TodoAPI.getInstance();

  const todosQuery = useQuery({
    queryKey: ['todos', options],
    queryFn: () => todoAPI.getTodos(options),
    keepPreviousData: true,
  });

  return todosQuery;
}

export default useTodos;
