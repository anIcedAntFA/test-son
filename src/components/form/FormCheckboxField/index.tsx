import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export interface IFormRadioGroupOptions {
  title: string;
  value: string | boolean;
}

interface IFormCheckboxGroupFieldProps {
  name: string;
  label: string;
  row?: boolean;
  disabled?: boolean;
}

function FormCheckboxField({ name, label, disabled, ...passProps }: IFormCheckboxGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl disabled={disabled}>
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} {...passProps} />}
              label={label}
            />
          </FormControl>
        );
      }}
    />
  );
}

export default FormCheckboxField;
