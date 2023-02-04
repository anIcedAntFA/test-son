import {
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  Stack,
  TextFieldProps,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Visibility, VisibilityOff } from 'src/components/ui/Icons';

interface IFormTextFieldProps {
  name: string;
  label: string;
  type?: string;
  password?: boolean;
}

function FormTextField({
  name,
  label,
  type,
  password,
  ...passProps
}: IFormTextFieldProps & TextFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, watch, clearErrors } = useFormContext();

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (watch(name) !== '') clearErrors(name);
  }, [watch(name)]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        password ? (
          <Stack direction="column">
            <MuiTextField
              {...field}
              label={label}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              error={!!error}
              {...passProps}
            />
            <FormHelperText component="span" error>
              {!!error && error.message}
            </FormHelperText>
          </Stack>
        ) : (
          <Stack direction="column" sx={{ width: '100%' }}>
            <MuiTextField label={label} {...field} fullWidth error={!!error} {...passProps} />
            <FormHelperText component="span" error>
              {!!error && error.message}
            </FormHelperText>
          </Stack>
        )
      }
    />
  );
}

export default FormTextField;
