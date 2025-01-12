import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Banjir from './pages/Admin/Banjir.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const RouteList = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />, 
      },],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),    
    children: [
      {
        index: true,
        element: <Dashboard />, 
      },
      {
        path: 'banjir',
        element: <Banjir />,
      },
    ],
  },
]);

export default RouteList;
