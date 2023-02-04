import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, useState } from 'react';

import { ITodoFilter, TODO_STATUSES, TodoStatusStateType } from 'src/features/todos';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

interface TodoFilterStatusProps {
  status: TodoStatusStateType[];
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

function TodoFilterStatus({ status, setFilter }: TodoFilterStatusProps) {
  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    const value = event.target.value;

    setFilter(
      (prev) =>
        ({
          ...prev,
          status: typeof value === 'string' ? value.split(',') : value,
        } as ITodoFilter),
    );
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={status}
        onChange={handleChange}
        input={<OutlinedInput label="Status" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {TODO_STATUSES.map((item, index) => (
          <MenuItem key={index} value={item}>
            <Checkbox checked={status.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TodoFilterStatus;
