import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CatsPage from './Pages/Cats';
import DogsPage from './Pages/Dogs';
import Landing from './Pages/Landing';
import LoginPage from './Pages/Login';
import Users from './Pages/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/landing",
    element: <Users />,
  },
  {
    path: "/dogs",
    element: <DogsPage />,
  },
  {
    path: "/cats",
    element: <CatsPage />,
  },
  {
    path: "/random",
    element: <Landing />,
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

<React.StrictMode>
<RouterProvider router={router} />
  </React.StrictMode>,
)
