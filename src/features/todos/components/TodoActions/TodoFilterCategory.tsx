import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch } from 'react';

import { TODO_CATEGORIES, ITodoFilter, TodoCategoryStateType } from 'src/features/todos';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

interface ITodoFilterCategoryProps {
  category: TodoCategoryStateType[];
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

function TodoFilterCategory({ category, setFilter }: ITodoFilterCategoryProps) {
  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const value = event.target.value;

    setFilter(
      (prev) =>
        ({
          ...prev,
          category: typeof value === 'string' ? value.split(',') : value,
        } as ITodoFilter),
    );
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={category}
        onChange={handleChange}
        input={<OutlinedInput label="Category" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {TODO_CATEGORIES.map((item, index) => (
          <MenuItem key={index} value={item}>
            <Checkbox checked={category.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TodoFilterCategory;
