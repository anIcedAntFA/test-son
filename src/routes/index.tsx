import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from 'src/layouts';
import { AuthenticationMiddleware, GuestMiddleware } from 'src/middlewares';
import ErrorPage from 'src/pages/error';
import { AUTH } from 'src/constants';
import { PATH_AUTH, PATH_PAGE } from './paths';

const HomePage = lazy(() => import('src/pages/home'));
const RegisterPage = lazy(() => import('src/pages/authentication/register'));
const LoginPage = lazy(() => import('src/pages/authentication/login'));

const router = createBrowserRouter([
  {
    element: <Layout variants={AUTH} />,
    children: [
      {
        path: PATH_AUTH.REGISTER,
        element: (
          <GuestMiddleware>
            <RegisterPage />
          </GuestMiddleware>
        ),
      },
      {
        path: PATH_AUTH.LOGIN,
        element: (
          <GuestMiddleware>
            <LoginPage />
          </GuestMiddleware>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: PATH_PAGE.ROOT,
    element: <Layout />,
    children: [
      {
        element: (
          <AuthenticationMiddleware>
            <HomePage />
          </AuthenticationMiddleware>
        ),
        index: true,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
