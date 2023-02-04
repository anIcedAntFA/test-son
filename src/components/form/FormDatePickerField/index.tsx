import { DatePickerProps } from '@mui/lab';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller, useFormContext } from 'react-hook-form';

import { formatAnyToDate } from 'src/utilities';

interface IFormMyDatePickerFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
}

function FormMyDatePickerField({
  name,
  label,
  // maxDate,
  // minDate,
  disabled,
  ...passProps
}: IFormMyDatePickerFieldProps & DatePickerProps<Date>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DesktopDatePicker
          {...field}
          onChange={(event) => field.onChange(formatAnyToDate(event))}
          label={label}
          inputFormat="MM/DD/YYYY"
          // maxDate={maxDate}
          // minDate={minDate}
          disabled={disabled}
          renderInput={(params) => {
            return <TextField {...params} sx={{ width: '100%' }} fullWidth error={!!error} />;
          }}
          {...passProps}
        />
      )}
    />
  );
}

export default FormMyDatePickerField;
