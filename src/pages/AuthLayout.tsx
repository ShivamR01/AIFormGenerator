import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Login } from './Login';
import { SignUp } from './SignUp';

export function AuthLayout() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden px-4">
      
      {/* ===== Floating Background Blobs ===== */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[200px] right-[-150px] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-120px] left-[50%] translate-x-[-50%] w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* ===== Form Card Container ===== */}
      <div className="relative z-10 w-full max-w-md">
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/signup" element={<SignUpCard />} />
        </Routes>
      </div>
    </div>
  );
}

// ===== Login Card =====
function LoginCard() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-lg">
          <span className="text-white font-bold text-2xl">🔑</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">Welcome Back</h1>
        <p className="text-gray-600 mt-2 text-center">Sign in to your account</p>
      </div>
      <Login />
      <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:text-indigo-600 font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

// ===== SignUp Card =====
function SignUpCard() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-lg">
          <span className="text-white font-bold text-2xl">✨</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">Create Account</h1>
        <p className="text-gray-600 mt-2 text-center">Start building AI-powered forms</p>
      </div>
      <SignUp />
      <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-indigo-600 font-medium">
          Sign In
        </Link>
      </p>
    </div>
  );
}

// ===== Tailwind Animation Classes =====
// Add this to your tailwind.config.js
/*
module.exports = {
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        blob: "blob 7s infinite",
      },
    },
  },
};
*/
