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
              'Welcome to TaskFlow',
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
            Join thousands of users who are already organizing their tasks and achieving their goals.
          </p>
        </div>
      </div>

      {/* Right side signup form */}
      <div className="flex flex-col justify-center items-center text-white w-full md:w-1/2 h-screen px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <p className="text-gray-400">Sign up to get started with TaskFlow</p>
          </div>
          {message && (
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-sm text-center text-blue-400">
              {message}
            </div>
          )}

          {!showVerification && !verified && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                />
              </div>
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
                  placeholder="Create a password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Email Verification UI */}
          {showVerification && !verified && (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                  placeholder="Enter code from your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Verify Email
              </button>
            </form>
          )}

          {verified && (
            <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-center">
              Your email is verified!{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300 underline font-semibold">
                Log in
              </a>
            </div>
          )}

          {!showVerification && !verified && (
            <p className="mt-6 text-gray-400 text-sm text-center">
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300 underline font-semibold">
                Sign In
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;