import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import {ToastContainer} from 'react-toastify'
import App from './App.jsx'
import { BrowserRouter , useNavigate } from 'react-router-dom'
import axios from 'axios'



//delete token when expired
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//       localStorage.removeItem('token');
//       sessionStorage.removeItem('token');
//       window.location.href("/login")
//     }
//     return Promise.reject(error);
//   }
// );

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
