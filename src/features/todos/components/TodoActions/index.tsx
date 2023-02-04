import { Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Dispatch, MouseEvent } from 'react';

import { AddIcon, GridViewIcon, ViewListIcon } from 'src/components/ui';
import {
  ITodoFilter,
  TodoCategoryStateType,
  TodoImportantStateType,
  TodoStatusStateType,
} from 'src/features/todos';
import { useDialog, useViewMode } from 'src/hooks';
import { EViewMode } from 'src/types';
import TodoFilterCategory from './TodoFilterCategory';
import TodoFilterEndDate from './TodoFilterEndDate';
import TodoFilterImportant from './TodoFilterImportant';
import TodoFilterSearch from './TodoFilterSearch';
import TodoFilterStartDate from './TodoFilterStartDate';
import TodoFilterStatus from './TodoFilterStatus';

interface ITodoSearchState {
  search: string | undefined;
  setSearch: Dispatch<React.SetStateAction<string | undefined>>;
}

interface ITodoFilterState {
  isImportant: TodoImportantStateType;
  category: TodoCategoryStateType[];
  status: TodoStatusStateType[];
  startDate: Date;
  endDate: Date;
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

interface ITodoActionsProps {
  todoQueryStatus: 'error' | 'success' | 'loading';
  searchState: ITodoSearchState;
  filterState: ITodoFilterState;
}

function TodoActions({
  todoQueryStatus,
  searchState: { search, setSearch },
  filterState: { isImportant, category, status, startDate, endDate, setFilter },
}: ITodoActionsProps) {
  const { viewMode, setViewMode } = useViewMode();

  const { setOpenFormDialog } = useDialog();

  const handleChangeViewMode = (event: MouseEvent<HTMLElement>, nextView: EViewMode) => {
    setViewMode(nextView);
  };

  return (
    <Grid container spacing={2} sx={{ padding: '0 16px' }} justifyContent="flex-end">
      <Grid item xs={2}>
        <TodoFilterImportant isImportant={isImportant} setFilter={setFilter} />
      </Grid>
      <Grid container item xs={7} justifyContent="flex-end">
        <TodoFilterSearch todoQueryStatus={todoQueryStatus} search={search} setSearch={setSearch} />
      </Grid>
      <Grid container item xs={3} justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: '56px', width: '212px', fontWeight: 700 }}
          onClick={() => setOpenFormDialog(true)}
        >
          New Todo
        </Button>
      </Grid>
      <Grid item xs={9 / 4}>
        <TodoFilterCategory category={category} setFilter={setFilter} />
      </Grid>
      <Grid item xs={9 / 4}>
        <TodoFilterStatus status={status} setFilter={setFilter} />
      </Grid>
      <Grid item xs={9 / 4}>
        <TodoFilterStartDate startDate={startDate} endDate={endDate} setFilter={setFilter} />
      </Grid>
      <Grid item xs={9 / 4}>
        <TodoFilterEndDate startDate={startDate} endDate={endDate} setFilter={setFilter} />
      </Grid>
      <Grid container item xs={3} justifyContent="flex-end">
        <ToggleButtonGroup value={viewMode} sx={{ height: '56px' }} exclusive>
          <ToggleButton
            aria-label="table"
            size="large"
            value={EViewMode.table}
            color="primary"
            sx={{ gap: '8px' }}
            onClick={(event) => handleChangeViewMode(event, EViewMode.table)}
          >
            <ViewListIcon />
            Table
          </ToggleButton>
          <ToggleButton
            aria-label="grid"
            size="large"
            value={EViewMode.grid}
            color="primary"
            sx={{ gap: '8px' }}
            onClick={(event) => handleChangeViewMode(event, EViewMode.grid)}
          >
            <GridViewIcon />
            Grid
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}

export default TodoActions;
