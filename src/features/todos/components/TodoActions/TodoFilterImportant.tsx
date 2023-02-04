import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch } from 'react';

import { IMPORTANT_OPTIONS, ITodoFilter, TodoImportantStateType } from 'src/features/todos';

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

interface ITodoFilterImportantProps {
  isImportant: TodoImportantStateType;
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

function TodoFilterImportant({ isImportant, setFilter }: ITodoFilterImportantProps) {
  const handleChangeImportant = (event: SelectChangeEvent<typeof isImportant>) => {
    setFilter(
      (prev) =>
        ({
          ...prev,
          isImportant: event.target.value,
        } as ITodoFilter),
    );
  };

  return (
    <FormControl sx={{ width: '196px' }}>
      <InputLabel id="todo-multiple-checkbox-label">Important</InputLabel>
      <Select
        labelId="todo-multiple-checkbox-label"
        id="todo-multiple-checkbox"
        value={isImportant}
        onChange={handleChangeImportant}
        input={<OutlinedInput label="isImportant" />}
        MenuProps={MenuProps}
      >
        {IMPORTANT_OPTIONS.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TodoFilterImportant;
