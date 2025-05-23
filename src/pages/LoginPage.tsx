
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import { Calendar } from "lucide-react";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side: Login Form */}
          <div className="flex flex-col justify-center">
            <LoginForm />
          </div>

          {/* Right side: Info */}
          <div className="hidden md:flex flex-col justify-center items-center text-center bg-gradient-to-br from-eventease-500 to-eventease-800 text-white p-8 rounded-lg">
            <Calendar className="h-20 w-20 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Welcome to EventEase</h2>
            <p className="text-xl mb-4">
              Your personal event management platform
            </p>
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-white/20 p-1 mr-3">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Discover and book events in seconds</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-white/20 p-1 mr-3">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Track all your upcoming and past events</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-white/20 p-1 mr-3">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>Access special deals and exclusive events</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
