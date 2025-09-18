import React, { useState } from 'react';
import TextType from './TextType';
import axios from 'axios';

const API_URL = import.meta.env.API_URL || "http://localhost:5000"; // safer

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        email,
        username,
        password,
      });
      setShowVerification(true);
      setMessage('Signup successful! Please check your email for a verification code.');
    } catch (error) {
      setMessage('Signup failed. Please try again.');
      console.error(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/verify`, {
        email,
        code: verificationCode,
      });
      setVerified(true);
      setMessage('Email verified successfully! You can now log in.');
    } catch (error) {
      setMessage('Verification failed. Please check your code and try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left side animation with overlay text */}
      <div className="hidden md:block w-1/2 relative h-screen bg-gray-900 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full">
          <TextType
            text={[
              'Welcome to TaskFlow , Organize Your Tasks , Boost Your Productivity !',
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-3xl font-bold text-white text-center px-4"
          />
        </div>
      </div>

      {/* Right side signup form */}
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white w-full md:w-1/2 h-screen">
        <h2 className="text-2xl font-bold">Welcome To TaskFlow</h2>
        <p className="text-gray-400">Sign up to continue</p>
        {message && (
          <div className="my-4 text-sm text-center text-blue-400">{message}</div>
        )}

        {!showVerification && !verified && (
          <form onSubmit={handleSubmit} className="mt-6 w-80">
            <div className="mb-4">
              <label className="block mb-1 text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Email Verification UI */}
        {showVerification && !verified && (
          <form onSubmit={handleVerify} className="mt-6 w-80">
            <div className="mb-4">
              <label className="block mb-1 text-sm">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter code from your email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-medium"
            >
              Verify Email
            </button>
          </form>
        )}

        {verified && (
          <div className="mt-6 text-green-400 text-center">
            Your email is verified! <a href="/login" className="text-blue-400 underline">Log in</a>
          </div>
        )}

        {!showVerification && !verified && (
          <p className="mt-6 text-gray-400 text-sm">
            have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUp;