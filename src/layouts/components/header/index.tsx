import { AppBar, Stack, Toolbar, Typography, styled } from '@mui/material';

import AccountMenu from './AccountMenu';
import Notification from './Notification';
import ThemeMode from './ThemeMode';

function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography fontSize="24px">ngockhoi96</Typography>
        <StyledHeading variant="h4">Simple Todo App</StyledHeading>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Notification />
          <ThemeMode />
          <AccountMenu />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  padding: '8px',
  borderRadius: '8px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: theme.palette.common.white,
}));

export default Header;
