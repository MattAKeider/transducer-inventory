import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MessagePage from './ui/MessagePage/MessagePage';
import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <MessagePage message='Page cound not be found!' isError />,
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
