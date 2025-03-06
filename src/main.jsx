import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import VenuesPage from './pages/VenuesPage/VenuesPage.jsx';
import ClassesPage from './pages/ClassesPage/ClassesPage.jsx';
import CheckInPage from './pages/CheckInPage/CheckInPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/venues" replace />,
      },
      {
        path: '/venues',
        element: <VenuesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/classes',
        element: <ClassesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/check-in',
        element: <CheckInPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
