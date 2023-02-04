import { Paper } from '@mui/material';
import { useState } from 'react';

import { Page, TableSkeleton } from 'src/components/ui';
import { CURRENT_PAGE, DESC, PAGE_SIZE } from 'src/constants';
import {
  ITodoFilter,
  ITodoPagination,
  ITodoSorting,
  TodoActions,
  TodoGrid,
  TodoTable,
  useTodos,
} from 'src/features/todos';
import { useDebounce, useViewMode } from 'src/hooks';
import { EViewMode } from 'src/types';
import { addDate, convertStringToBooleanImportant, subtractDate } from 'src/utilities';

function HomePage() {
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [filter, setFilter] = useState<ITodoFilter>({
    isImportant: 'all',
    category: [],
    status: [],
    startDate: subtractDate(2, 'month'),
    endDate: addDate(2, 'month'),
  });

  const [sorting, setSorting] = useState<ITodoSorting>({
    sortBy: 'endDate',
    orderBy: DESC,
  });

  const [pagination, setPagination] = useState<ITodoPagination>({
    currentPage: CURRENT_PAGE,
    pageSize: PAGE_SIZE,
  });

  const debouncedValue = useDebounce(search, 400);

  const { viewMode } = useViewMode();

  const { isImportant, category, status, startDate, endDate } = filter;
  const { sortBy, orderBy } = sorting;
  const { currentPage, pageSize } = pagination;

  const todosQuery = useTodos({
    search: debouncedValue,
    isImportant: convertStringToBooleanImportant(isImportant),
    category,
    status,
    startDate,
    endDate,
    sortBy,
    orderBy,
    currentPage: currentPage + 1,
    pageSize,
  });

  const { status: todoQueryStatus, error, data } = todosQuery;

  if (todoQueryStatus === 'loading') return <TableSkeleton />;
  if (todoQueryStatus === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <Page title="Home">
      <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
        <TodoActions
          todoQueryStatus={todoQueryStatus}
          searchState={{ search, setSearch }}
          filterState={{ isImportant, category, status, startDate, endDate, setFilter }}
        />

        {viewMode === EViewMode.table && (
          <TodoTable
            data={data}
            filterState={{ setFilter }}
            sortingState={{ sortBy, orderBy, setSorting }}
            paginationState={{ currentPage, pageSize, setPagination }}
          />
        )}

        {viewMode === EViewMode.grid && <TodoGrid />}
      </Paper>
    </Page>
  );
}

export default HomePage;
