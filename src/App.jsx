import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Auth from './pages/Auth.jsx';
import LinkPage from './pages/LinkPage.jsx';
import RedirectLink from './pages/RedirectLink.jsx';
import UrlProvider from './Context.jsx';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/dashboard',
        element: <RequireAuth><Dashboard /></RequireAuth>
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: <RequireAuth><LinkPage /></RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      }
    ]
  }
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
