import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
    <ToastContainer position='bottom-right'/>
    <RouterProvider router={router} />
    </>
  );
}

export default App
