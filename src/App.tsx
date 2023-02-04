import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import AuthenticationContextProvider from './contexts/AuthenticationContext';
import FormModeContextProvider from './contexts/FormModeContext';
import ViewModeContextProvider from './contexts/ViewModeContext';
import router from './routes';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Suspense fallback={<div>Loading...</div>}>
        <FormModeContextProvider>
          <ViewModeContextProvider>
            <AuthenticationContextProvider>
              <RouterProvider router={router} />
            </AuthenticationContextProvider>
          </ViewModeContextProvider>
        </FormModeContextProvider>
      </Suspense>
    </LocalizationProvider>
  );
}

export default App;
