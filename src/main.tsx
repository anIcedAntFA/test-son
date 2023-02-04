import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';

import App from 'src/App';
import DialogContextProvider from 'src/contexts/DialogContext';
import ThemeSettingContextProvider from 'src/contexts/ThemeModeContext';
import 'src/styles/main.css';
import MuiThemeProvider from 'src/theme';
import { ONE_HOUR, ONE_MINUTE } from 'src/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: ONE_HOUR,
      staleTime: ONE_MINUTE,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DialogContextProvider>
          <ThemeSettingContextProvider>
            <MuiThemeProvider>
              <ToastContainer closeOnClick pauseOnFocusLoss draggable pauseOnHover />
              <App />
            </MuiThemeProvider>
          </ThemeSettingContextProvider>
        </DialogContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
