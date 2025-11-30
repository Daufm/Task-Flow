import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Content from '@/content.jsx'
import Login from '@/Login.jsx'
import SignUp from '@/SignUp.jsx'
import Home from '@/Homepage.jsx'
import Setting from '@/setting.jsx'
import LandingPage from '@/LandingPage.jsx'



function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token') || sessionStorage.getItem('token'));
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
   
  useEffect(()=>{
    const checkToken  = ()=>{
      setAuth(localStorage.getItem('token') || sessionStorage.getItem('token'));
    };
    window.addEventListener('storage', checkToken);
    return ()=>{
      window.removeEventListener('storage', checkToken);
    };
  }, []);



  if (!auth) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={() => setAuth(localStorage.getItem('token') || sessionStorage.getItem('token'))} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }

 

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => setAuth(localStorage.getItem('token') || sessionStorage.getItem('token'))} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard"  element={<Home />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Content />} /> {/* for "/" */}
        <Route path="cat" element={<Content />} />
        <Route path="filter" element={<Content />} />
      </Route>
</Routes>
  )
}

export default App
