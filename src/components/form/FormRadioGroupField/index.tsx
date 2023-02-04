import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export interface IFormRadioGroupOptions {
  title: string;
  value: string | boolean;
}

interface IFormRadioGroupFieldProps {
  name: string;
  label: string;
  options: IFormRadioGroupOptions[];
  row?: boolean;
  disabled?: boolean;
}

function FormRadioGroupField({ name, row, label, options, disabled }: IFormRadioGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl disabled={disabled}>
          <RadioGroup
            {...field}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            {options.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.title}
                labelPlacement="end"
                sx={{ mr: 5 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}

export default FormRadioGroupField;
