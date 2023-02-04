import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Dispatch } from 'react';

import { ITodoFilter } from 'src/features/todos/types';
import { formatAnyToDate } from 'src/utilities';

interface ITodoFilterEndDateProps {
  startDate: Date;
  endDate: Date;
  setFilter: Dispatch<React.SetStateAction<ITodoFilter>>;
}

function TodoFilterEndDate({ startDate, endDate, setFilter }: ITodoFilterEndDateProps) {
  const handleChange = (newValue: Date | null) => {
    setFilter((prev) => ({ ...prev, endDate: newValue } as ITodoFilter));
  };

  return (
    <DesktopDatePicker
      label="End Date"
      inputFormat="MM/DD/YYYY"
      value={endDate}
      minDate={formatAnyToDate(startDate)}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
    />
  );
}

export default TodoFilterEndDate;
