import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './pages/Root';
import Transducers from './components/Transducers/Transducers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Transducers /> }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
