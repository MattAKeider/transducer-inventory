import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MessagePage from './components/MessagePage/MessagePage';
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <MessagePage message='Page cound not be found!' />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login />}
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
