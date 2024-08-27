'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Check if the password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          username: credentials.username, // Ensure username is included in the request
        }),
      });

      if (res.ok) {
        // Automatically sign in the user after successful signup
        const signInRes = await signIn('credentials', {
          redirect: false,
          email: credentials.email,
          password: credentials.password,
        });

        if (signInRes?.ok) {
          router.push('/'); // Redirect to the home page after successful sign-in
        } else {
          setError('Failed to sign in after signup. Please try logging in manually.');
        }
      } else {
        const { message } = await res.json();
        setError(message || 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[600px]">
        <h1 className="text-2xl max-md:text-xl text-center font-bold mb-6">Sign Up</h1>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              aria-label="Username"
              placeholder=""
              value={credentials.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              aria-label="Email"
              placeholder=""
              value={credentials.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                aria-label="Password"
                placeholder=""
                value={credentials.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline pr-10"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye className="text-gray-600" /> : <FaEyeSlash className="text-gray-600" />}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              aria-label="Confirm Password"
              placeholder=""
              value={credentials.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => router.push('/auth/signin')} // Redirect to the sign-in page
              className="text-blue-600 hover:text-blue-400 font-bold py-2 px-4 w-full focus:shadow-outline"
            >
              Already have an account? Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
