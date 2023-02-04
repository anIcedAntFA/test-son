import { FormControl, MenuItem, InputLabel, Select, SelectProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { ITodoOption } from 'src/features/todos';

interface IFormSelectFieldProps {
  name: string;
  label: string;
  options: ITodoOption[];
  disabled?: boolean;
}

function FormSelectField({
  name,
  label,
  options,
  disabled,
  ...passProps
}: IFormSelectFieldProps & SelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={{ minWidth: 120, width: '100%' }} disabled={disabled}>
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
          <Select
            {...field}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label={label}
            fullWidth
            error={!!error}
            {...passProps}
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default FormSelectField;
