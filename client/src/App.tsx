import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min'

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
