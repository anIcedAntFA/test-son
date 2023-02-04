import { useRouteError } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Page } from 'src/components/ui';

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Page title="Page Error">
      <Typography sx={{}}>{error.status}</Typography>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
      <Typography variant="h3" paragraph>
        Sorry, page not found!
      </Typography>

      <Typography>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
        sure to check your spelling.
      </Typography>

      <Box
        component="img"
        src="/assets/illustrations/illustration_404.svg"
        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
      />

      <Button to="/" size="large" variant="contained" component={RouterLink}>
        Go to Home
      </Button>
    </Page>
  );
}

export default ErrorPage;
