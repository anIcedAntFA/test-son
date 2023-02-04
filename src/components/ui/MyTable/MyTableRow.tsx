import { Checkbox, TableCell, TableRow } from '@mui/material';
import { MouseEvent, MouseEventHandler, ReactNode } from 'react';

import { MyTooltip } from 'src/components/ui';
import { IdType } from 'src/types';

interface ITableRowProps {
  rowId: IdType;
  isItemSelected: boolean;
  labelId: string;
  handleClick: (event: MouseEvent<unknown>, name: IdType) => void;
  handleDoubleClick: MouseEventHandler<HTMLTableRowElement>;
  children: ReactNode;
}

function MyTableRow({
  rowId,
  labelId,
  isItemSelected,
  handleClick,
  handleDoubleClick,
  children,
}: ITableRowProps) {
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={rowId}
      selected={isItemSelected}
      onDoubleClick={handleDoubleClick}
    >
      <TableCell padding="checkbox" size="small">
        <MyTooltip title="Select One">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
            onClick={(event) => handleClick(event, rowId)}
          />
        </MyTooltip>
      </TableCell>
      {children}
    </TableRow>
  );
}

export default MyTableRow;
