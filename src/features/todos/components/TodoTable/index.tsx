import {
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ChangeEvent, Dispatch, MouseEvent, useState } from 'react';

import {
  Image,
  MoreVertIcon,
  MyTableHead,
  MyTablePaginationActions,
  MyTableRow,
  MyTableToolbar,
  MyTooltip,
  StarIcon,
  StarOutlineIcon,
} from 'src/components/ui';
import { ASC, CURRENT_PAGE, DESC, images } from 'src/constants';
import {
  ITodo,
  ITodoFilter,
  ITodoPagination,
  ITodoSorting,
  TODO_CATEGORY_ICONS_MAPPING,
  TODO_HEAD_CELLS,
  TODO_ROWS_PER_PAGE_OPTIONS,
  TODO_STATUS_COLORS_MAPPING,
  TodoCategoryStateType,
  TodoStatusStateType,
  useUpdateTodo,
} from 'src/features/todos';
import { useDialog, useFormMode, useThemeSetting } from 'src/hooks';
import {
  EConfirmDelete,
  EFormMode,
  EThemeMode,
  EToastMessage,
  IPagingResult,
  IdType,
  OrderBy,
} from 'src/types';
import { formatDateToString, showToastMessage } from 'src/utilities';
import TodoTableMenuActions from './TodoTableMenuActions';

interface ITodoFilterState {
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

interface ITodoSortingState {
  sortBy: string;
  orderBy: OrderBy;
  setSorting: Dispatch<React.SetStateAction<ITodoSorting>>;
}

interface ITodoPaginationState {
  currentPage: number;
  pageSize: number;
  setPagination: Dispatch<React.SetStateAction<ITodoPagination>>;
}

interface ITodoTableProps {
  data: IPagingResult<ITodo>;
  filterState: ITodoFilterState;
  paginationState: ITodoPaginationState;
  sortingState: ITodoSortingState;
}

function TodoTable({
  data,
  filterState: { setFilter },
  sortingState: { sortBy, orderBy, setSorting },
  paginationState: { currentPage, pageSize, setPagination },
}: ITodoTableProps) {
  const [currentTodo, setCurrentTodo] = useState<Omit<ITodo, 'createdAt' | 'updatedAt'>>();

  const [selected, setSelected] = useState<IdType[]>([]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { themeMode } = useThemeSetting();

  const { setOpenFormDialog, setConfirmDeleteDialog, hideAllDialog } = useDialog();

  const { setFormMode, resetFormMode } = useFormMode();

  const updateTodoMutation = useUpdateTodo({
    onSuccess(_, updatedData) {
      showToastMessage(
        `Update Todo ${updatedData.data.title} with ID ${updatedData?.id} successfully`,
        EToastMessage.success,
      );
      hideAllDialog();
    },
  });

  const todos = data.data;
  const totalTodos = data.totalItems;

  const isLight = themeMode === EThemeMode.light;
  const isSelected = (id: IdType) => selected.includes(id);
  const isSelectedAll =
    selected.length > 0 &&
    selected.every((item) => todos.findIndex((todo) => todo.id === item) > -1);

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof ITodo | 'actions') => {
    const isAsc = sortBy === property && orderBy === ASC;

    setSorting(
      (prev) =>
        ({
          ...prev,
          sortBy: property,
          orderBy: isAsc ? DESC : ASC,
        } as ITodoSorting),
    );
  };

  const handleSelectAllTodos = (event: ChangeEvent<HTMLInputElement>) => {
    const currentSelected = todos?.map((todo) => todo.id) ?? [];

    setSelected(isSelectedAll ? [] : currentSelected);
  };

  const handleSelectTodo = (event: MouseEvent<unknown>, id: IdType) => {
    const isSelected = selected.includes(id);
    let currentSelected;

    if (isSelected) {
      currentSelected = selected.filter((item) => item != id);
    } else {
      currentSelected = [...selected, id];
    }

    setSelected(currentSelected);
  };

  const handleChangeImportant = (id: IdType, data: ITodo) => {
    updateTodoMutation.mutate({ id, data });
  };

  const handleFilterCategory = (category: TodoCategoryStateType) => {
    setFilter((prev) => ({ ...prev, category: [category] }));
  };

  const handleFilterStatus = (status: TodoStatusStateType) => {
    setFilter((prev) => ({ ...prev, status: [status] }));
  };

  const handleClickTodoTitle = (row: ITodo) => {
    setCurrentTodo(row);
    handlePreviewTodo();
  };

  const handleDoubleClickRow = (
    event: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    row: ITodo,
  ) => {
    const target = event.target as HTMLInputElement;

    if (
      target.localName === 'input' ||
      target.className.includes('MuiTooltip-tooltip') ||
      target.className.includes('MuiChip-label')
    ) {
      return;
    }

    return handleClickTodoTitle(row);
  };

  const handleClickMenuActions = (event: MouseEvent<HTMLElement>, row: ITodo) => {
    setCurrentTodo(row);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuActions = () => {
    setAnchorEl(null);
  };

  const handlePreviewTodo = () => {
    setOpenFormDialog(true);
    setFormMode(EFormMode.preview);
    handleCloseMenuActions();
  };

  const handleEditTodo = () => {
    setOpenFormDialog(true);
    setFormMode(EFormMode.edit);
    handleCloseMenuActions();
  };

  const handleCloseForm = () => {
    setOpenFormDialog(false);
    setCurrentTodo(undefined);
    resetFormMode();
  };

  const handleDeleteTodo = (type: EConfirmDelete) => {
    if (type === EConfirmDelete.one) {
      setConfirmDeleteDialog(EConfirmDelete.one);
    } else {
      setConfirmDeleteDialog(EConfirmDelete.many);
    }
    handleCloseMenuActions();
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: CURRENT_PAGE,
      pageSize: parseInt(event.target.value, 10),
    }));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = currentPage > 0 ? Math.max(0, (1 + currentPage) * pageSize - totalTodos) : 0;

  return (
    <>
      <MyTableToolbar
        numSelected={selected.length}
        handleDeleteMany={() => handleDeleteTodo(EConfirmDelete.many)}
      />

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <MyTableHead
            orderBy={orderBy}
            sortBy={sortBy}
            isSelectedAll={isSelectedAll}
            rowCount={totalTodos}
            headCells={TODO_HEAD_CELLS}
            onSelectAllClick={handleSelectAllTodos}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {todos?.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <MyTableRow
                  key={row.id}
                  rowId={row.id}
                  isItemSelected={isItemSelected}
                  labelId={labelId}
                  handleClick={handleSelectTodo}
                  handleDoubleClick={(event) => handleDoubleClickRow(event, row)}
                >
                  <TableCell size="small">
                    {row.isImportant && (
                      <MyTooltip title="Is Important" placement="top">
                        <IconButton
                          onClick={() =>
                            handleChangeImportant(row.id, {
                              ...row,
                              isImportant: !row.isImportant,
                            })
                          }
                        >
                          <StarIcon color="warning" />
                        </IconButton>
                      </MyTooltip>
                    )}
                    {!row.isImportant && (
                      <MyTooltip title="Not Important" placement="top">
                        <IconButton
                          onClick={() =>
                            handleChangeImportant(row.id, {
                              ...row,
                              isImportant: !row.isImportant,
                            })
                          }
                        >
                          <StarOutlineIcon color="warning" />
                        </IconButton>
                      </MyTooltip>
                    )}
                  </TableCell>
                  <TableCell component="th" id={labelId} size="small" scope="row" padding="none">
                    <Typography
                      onClick={() => handleClickTodoTitle(row)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: (theme) => theme.palette.primary.main,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell size="small">
                    <MyTooltip title={`Filter ${row.category}`} placement="left">
                      <Chip
                        label={row.category}
                        variant={isLight ? 'outlined' : 'filled'}
                        color="secondary"
                        icon={TODO_CATEGORY_ICONS_MAPPING[row.category]}
                        sx={{ borderRadius: '8px' }}
                        onClick={() => handleFilterCategory(row.category)}
                      />
                    </MyTooltip>
                  </TableCell>
                  <TableCell size="small">{formatDateToString(row.startDate)}</TableCell>
                  <TableCell size="small">{formatDateToString(row.endDate)}</TableCell>
                  <TableCell size="small">
                    <MyTooltip title={`Filter ${row.status}`} placement="left">
                      <Chip
                        label={row.status}
                        variant={isLight ? 'outlined' : 'filled'}
                        color={TODO_STATUS_COLORS_MAPPING[row.status]}
                        sx={{ borderRadius: '8px', fontWeight: '700' }}
                        onClick={() => handleFilterStatus(row.status)}
                      />
                    </MyTooltip>
                  </TableCell>
                  <TableCell size="small">
                    <MyTooltip title="Menu Actions" placement="left">
                      <IconButton
                        onClick={(event) => handleClickMenuActions(event, row)}
                        disabled={selected.length > 0}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </MyTooltip>
                  </TableCell>
                </MyTableRow>
              );
            })}

            {!todos && (
              <TableRow>
                <TableCell size="small" colSpan={12}>
                  <Stack direction="column" justifyContent="center" alignItems="center">
                    <Image src={images.noData} alt="No Data" width={400} />
                    <Typography component="p" color="primary" fontSize="48px">
                      No Todos Found
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell size="small" colSpan={12} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={TODO_ROWS_PER_PAGE_OPTIONS}
                colSpan={12}
                count={totalTodos}
                rowsPerPage={pageSize}
                page={currentPage}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={MyTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <TodoTableMenuActions
        anchorEl={anchorEl}
        currentTodo={currentTodo}
        todoIdsSelected={selected}
        setSelected={setSelected}
        handleCloseMenuActions={handleCloseMenuActions}
        handlePreviewTodo={handlePreviewTodo}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={() => handleDeleteTodo(EConfirmDelete.one)}
        handleCloseForm={handleCloseForm}
      />
    </>
  );
}

export default TodoTable;
