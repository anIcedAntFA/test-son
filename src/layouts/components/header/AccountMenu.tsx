import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  MenuItem,
  Popover,
  Switch,
  styled,
} from '@mui/material';
import { ChangeEvent, MouseEvent, useState } from 'react';

import { AccountCircleIcon, LogoutIcon, MyTooltip } from 'src/components/ui';
import { useAuthentication } from 'src/hooks';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [checked, setChecked] = useState(false);

  const { authentication } = useAuthentication();

  const handleChangeLanguage = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleOpenAccountMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {authentication?.isAuthenticated && (
        <Box sx={{ flexGrow: 0 }}>
          <MyTooltip title="Account Menu">
            <IconButton onClick={handleOpenAccountMenu}>
              <Avatar
                alt="Avatar"
                // src="https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_960_720.jpg"
                sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}
              >
                {authentication?.simpleUser.firstName[0]}
                {authentication?.simpleUser.lastName[0]}
              </Avatar>
            </IconButton>
          </MyTooltip>
          <Popover
            id="account-menu"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={PaperProps}
            onClose={handleCloseAccountMenu}
          >
            <StyedMenuItem disableRipple onClick={handleCloseAccountMenu}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              Profile
            </StyedMenuItem>
            <StyedMenuItem sx={{ padding: '4px' }} disableRipple>
              <FormControlLabel
                control={
                  <StyledVietnameseSwitch checked={checked} onChange={handleChangeLanguage} />
                }
                label="Vietnamese"
                sx={{ gap: '8px', marginLeft: '-6px' }}
              />
            </StyedMenuItem>
            <Divider />
            <StyedMenuItem disableRipple onClick={handleCloseAccountMenu}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </StyedMenuItem>
          </Popover>
        </Box>
      )}
    </>
  );
}

const PaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.2,
    p: 1,
    '& .MuiAvatar-root': {
      width: 40,
      height: 40,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 20,
      width: 12,
      height: 12,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const StyedMenuItem = styled(MenuItem)(({ theme }) => ({
  gap: '12px',
  '&:hover, &:hover .MuiListItemIcon-root': {
    color: theme.palette.primary.light,
  },
}));

const StyledVietnameseSwitch = styled(Switch)(({ theme }) => ({
  padding: 6,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default AccountMenu;
