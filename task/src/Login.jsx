import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TextType from './TextType';
import axios from 'axios';
import { toast } from 'react-toastify';



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
    <div className="flex flex-row h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Left side animation with overlay text */}
      <div className="hidden md:block w-1/2 relative h-screen bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex flex-col justify-center items-center border-r border-gray-700">
        <div className="flex flex-col justify-center items-center h-full px-8">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <TextType 
            text={[
              'Welcome Back to TaskFlow',
              'Organize Your Tasks',
              'Boost Your Productivity',
            ]}
            typingSpeed={75}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            className="text-4xl font-bold text-center px-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          />
          <p className="text-gray-300 text-lg mt-8 text-center max-w-md">
            Sign in to continue managing your tasks and achieving your goals.
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex flex-col justify-center items-center text-white w-full md:w-1/2 h-screen px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-gray-800/50 border-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-gray-300 text-sm">Remember me</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-gray-400 text-sm text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-400 hover:text-blue-300 underline font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
