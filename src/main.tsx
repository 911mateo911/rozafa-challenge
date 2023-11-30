import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect
} from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { getSavedUser } from './helpers/getSavedUser';
import { LOGIN_ERROR_QP_KEY, LoginFormErrors } from './pages/Login/types';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route
        index
        element={<Profile />}
        loader={async () => {
          const savedUser = getSavedUser();

          if (!savedUser) {
            return redirect(`/login?${LOGIN_ERROR_QP_KEY}=${LoginFormErrors.NOT_LOGGED}`);
          }

          return null;
        }}
      />
      <Route
        path='/login'
        element={<Login />}
        loader={async () => {
          const savedUser = getSavedUser();

          if (savedUser) {
            // Could have had some toaster in here
            return redirect('/');
          }

          return null;
        }}
      />
      <Route
        path='*'
        element={<Navigate to='/' />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
