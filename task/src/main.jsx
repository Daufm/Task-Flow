import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import {ToastContainer} from 'react-toastify'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
