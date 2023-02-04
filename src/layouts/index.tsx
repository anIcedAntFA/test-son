import { Outlet } from 'react-router-dom';
import { Container, styled } from '@mui/material';

import { Footer, Header } from './components';
import { ADMIN, AUTH } from 'src/constants';

interface ILayoutProps {
  variants?: typeof ADMIN | typeof AUTH;
}

function Layout({ variants }: ILayoutProps) {
  if (variants === 'auth') {
    return (
      <StyledRoot>
        <StyledContainer maxWidth="sm">
          <Outlet />
        </StyledContainer>
      </StyledRoot>
    );
  }

  return (
    <StyledRoot>
      <StyledContainer>
        <Header />
        <Outlet />
        <Footer />
      </StyledContainer>
    </StyledRoot>
  );
}

const StyledRoot = styled(`div`)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  // minWidth: '1400px',
  padding: '24px 24px',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
}));

export default Layout;
