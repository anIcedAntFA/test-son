import { Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { RegisterForm } from 'src/features/authentication';
import { PATH_AUTH, PATH_PAGE } from 'src/routes/paths';

function RegisterPage() {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h3" mb={4} fontWeight="700" color="primary" textAlign="center">
        Register for <br />
        <Link to={PATH_PAGE.ROOT} className="logo-link">
          Simple Todo App
        </Link>
      </Typography>
      <RegisterForm />
      <Divider sx={{ width: '100%', margin: '16px 0' }} />
      <Typography>
        Already have an account?{' '}
        <Link to={PATH_AUTH.LOGIN} className="text-link">
          Login
        </Link>
      </Typography>
    </Stack>
  );
}

export default RegisterPage;
