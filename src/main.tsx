import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route index element={<Profile />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
