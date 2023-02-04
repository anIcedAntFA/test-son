import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, Stack, styled } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TypeOf, z } from 'zod';

import { FormProvider, FormTextField } from 'src/components/form';
import { LoginIcon } from 'src/components/ui';
import { useLoginUser } from 'src/features/authentication';
import { useAuthentication } from 'src/hooks';
import { PATH_AUTH, PATH_PAGE } from 'src/routes/paths';
import { showToastMessage } from 'src/utilities';
import { EToastMessage } from 'src/types';

const loginFormSchema = z.object({
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

type LoginValuesType = TypeOf<typeof loginFormSchema>;

const defaultLoginFormValues: LoginValuesType = {
  email: '',
  password: '',
};

function LoginForm() {
  const methods = useForm<LoginValuesType>({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: defaultLoginFormValues,
    resolver: zodResolver(loginFormSchema),
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const { authentication, handleUpdateAuthentication } = useAuthentication();

  const loginUserMutation = useLoginUser({
    onSuccess(authData) {
      handleUpdateAuthentication({
        ...authentication,
        simpleUser: authData.simpleUser,
        accessToken: authData.accessToken,
        isAuthenticated: true,
      });

      showToastMessage('Welcome to Simple Todo App', EToastMessage.success);
      navigate(`${PATH_PAGE.ROOT}`);
    },
    onError(error) {
      showToastMessage(error.response.data.message, EToastMessage.error);
    },
  });

  const onSubmit: SubmitHandler<LoginValuesType> = (data) => {
    loginUserMutation.mutate(data);
  };

  const isLoading = loginUserMutation.isLoading;

  const isDisabled = !isValid || isSubmitting;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={4}>
        <Stack direction="column" spacing={2}>
          <FormTextField name="email" label="Email" />
          <FormTextField password name="password" label="Password" />
          <Button
            component={Link}
            to={PATH_AUTH.REGISTER}
            sx={{ width: '148px', textTransform: 'none' }}
          >
            Forgot password?
          </Button>
        </Stack>
        <Stack direction="column" spacing={2}>
          <StyledLoadingButton
            type="submit"
            variant="contained"
            startIcon={<LoginIcon />}
            loadingPosition="start"
            loading={isLoading}
            disabled={isDisabled}
          >
            Login
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

export default LoginForm;
