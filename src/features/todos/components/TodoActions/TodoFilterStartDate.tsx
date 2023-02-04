import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Dispatch } from 'react';

import { ITodoFilter } from 'src/features/todos/types';
import { formatAnyToDate } from 'src/utilities';

interface ITodoTodoFilterStartDate {
  startDate: Date;
  endDate: Date;
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

function TodoFilterStartDate({ startDate, endDate, setFilter }: ITodoTodoFilterStartDate) {
  const handleChange = (newValue: Date | null) => {
    setFilter((prev) => ({ ...prev, startDate: newValue } as ITodoFilter));
  };

  return (
    <DesktopDatePicker
      label="Start Date"
      inputFormat="MM/DD/YYYY"
      value={startDate}
      onChange={handleChange}
      maxDate={formatAnyToDate(endDate)}
      renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
    />
  );
}

export default TodoFilterStartDate;
