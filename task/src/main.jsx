import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Content from './content.jsx'

<Routes>
  <Route path="/dashboard" element={<Content />} />
  <Route path="/cat" element={<Content />} />
  <Route path="/filter" element={<Content />} />
   <Route path="/" element={<Content />} />
</Routes>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
