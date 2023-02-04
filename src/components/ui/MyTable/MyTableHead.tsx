import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ChangeEvent, MouseEvent } from 'react';

import { MyTooltip } from 'src/components/ui';
import { ASC, DESC } from 'src/constants';
import { OrderBy } from 'src/types';

type IIdHeadCell<T> = keyof T | 'actions';

export interface IHeadCell<T> {
  disablePadding: boolean;
  id: IIdHeadCell<T>;
  label: string;
  numeric: boolean;
}

interface ITableHeadProps<T> {
  isSelectedAll: boolean;
  onRequestSort: (event: MouseEvent<unknown>, property: IIdHeadCell<T>) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  orderBy: OrderBy;
  sortBy: string;
  rowCount: number;
  headCells: IHeadCell<T>[];
}

function MyTableHead<T>({
  sortBy,
  orderBy,
  rowCount,
  headCells,
  isSelectedAll,
  onRequestSort,
  onSelectAllClick,
}: ITableHeadProps<T>) {
  const createSortHandler = (property: IIdHeadCell<T>) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <MyTooltip title="Select All" placement="right">
            <Checkbox
              color="primary"
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && isSelectedAll}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </MyTooltip>
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={sortBy === headCell.id ? orderBy : false}
          >
            <TableSortLabel
              hideSortIcon={headCell.id === 'actions'}
              active={sortBy === headCell.id}
              direction={sortBy === headCell.id ? orderBy : ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {sortBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {orderBy === DESC ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MyTableHead;
