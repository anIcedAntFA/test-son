import { Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { LoginForm } from 'src/features/authentication';
import { PATH_AUTH, PATH_PAGE } from 'src/routes/paths';

function RegisterPage() {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h3" mb={4} fontWeight="700" color="primary" textAlign="center">
        Login for <br />
        <Link to={PATH_PAGE.ROOT} className="logo-link">
          Simple Todo App
        </Link>
      </Typography>
      <LoginForm />
      <Divider sx={{ width: '100%', margin: '16px 0' }} />
      <Typography>
        Don’t have an account?{' '}
        <Link to={PATH_AUTH.REGISTER} className="text-link">
          Register
        </Link>
      </Typography>
    </Stack>
  );
}

export default RegisterPage;
