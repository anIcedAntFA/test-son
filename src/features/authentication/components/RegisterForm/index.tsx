import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, InputAdornment, Stack, styled } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeOf, z } from 'zod';

import { FormProvider, FormTextField } from 'src/components/form';
import { AppRegistrationIcon, TelegramIcon } from 'src/components/ui';
import { useRegisterUser } from 'src/features/authentication';
import { PATH_AUTH } from 'src/routes/paths';
import { showToastMessage } from 'src/utilities';
import { EToastMessage } from 'src/types';

const registerFormSchema = z.object({
  firstName: z.string().min(1, '*Please enter your first name'),
  lastName: z.string().min(1, '*Please enter your last name'),
  email: z
    .string()
    .min(1, '*Please enter your email')
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      '*Please enter a valid email',
    ),
  password: z
    .string()
    .trim()
    .min(1, '*Please enter your password')
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
      '*Password must 8-20 characters, at least ONE uppercase, lowercase, digit, and special character',
    ),
});

type RegisterValuesType = TypeOf<typeof registerFormSchema>;

const defaultRegisterFormValues: RegisterValuesType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

function RegisterForm() {
  const methods = useForm<RegisterValuesType>({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: defaultRegisterFormValues,
    resolver: zodResolver(registerFormSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const registerUserMutation = useRegisterUser({
    onSuccess() {
      showToastMessage('Congratulations, you have registered successfully', EToastMessage.success);

      reset();
      navigate(`${PATH_AUTH.LOGIN}`);
    },
    onError(error) {
      showToastMessage(error.response?.data.message, EToastMessage.error);
    },
  });

  const onSubmit: SubmitHandler<RegisterValuesType> = (newUser) => {
    registerUserMutation.mutate(newUser);
  };

  const isLoading = registerUserMutation.isLoading;

  const isDisabled = !isValid || isSubmitting;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={4}>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <FormTextField name="firstName" label="First name" />
            <FormTextField name="lastName" label="Last name" />
          </Stack>
          <FormTextField name="email" label="Email" />
          <FormTextField password name="password" label="Password" />
          <FormTextField
            name="code"
            label="Code"
            placeholder="Enter 6-digit code"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" startIcon={<TelegramIcon />} disabled={true}>
                    Send code
                  </Button>
                </InputAdornment>
              ),
            }}
            disabled
          />
        </Stack>
        <Stack direction="column" spacing={2}>
          <StyledLoadingButton
            type="submit"
            variant="contained"
            startIcon={<AppRegistrationIcon />}
            loading={isLoading}
            loadingPosition="start"
            disabled={isDisabled}
          >
            Register
          </StyledLoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  height: '56px',
  fontWeight: 700,
  '& .MuiCircularProgress-root': {
    width: '20px',
    height: '20px',
  },
}));

export default RegisterForm;
