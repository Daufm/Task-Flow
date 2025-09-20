import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TextType from './TextType';
import axios from 'axios';



function Login({onLogin}) {

const API_URL = import.meta.env.API_URL || 'http://localhost:5000';

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    
   const token = response.data.token;
   
   if (rememberMe) {
     localStorage.setItem('token', token);
   } else {
     sessionStorage.setItem('token', token);
   }

    // Redirect to dashboard or another page
    if(onLogin) onLogin();
    navigate('/dashboard');

  } catch (error) {
    console.error(error);
    toast.error("Login failed. Please check your credentials.");
  }
}





  return (
    <div className="flex flex-row h-screen">
      {/* Left side animation with overlay text */}
      <div className="hidden md:block w-1/2 relative h-screen bg-gray-900 flex flex-col justify-center items-center">
        {/* Simple React animation: bouncing React logo */}
        <div className="flex flex-col justify-center items-center h-full">
          <TextType 
              text={["Welcome to TaskFlow , Organize Your Tasks , Boost Your Productivity !"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl font-bold text-white text-center px-4"
            />

          </div>
      </div>

      {/* Right side login form */}
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white w-full md:w-1/2 h-screen">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-gray-400">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="mt-6 w-80">
          <div className="mb-4">
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
             type="checkbox"
             className="mr-2"
             checked={rememberMe}
             onChange={e => setRememberMe(e.target.checked)}
           />
            <span className="text-gray-400 text-sm">Remember me</span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
