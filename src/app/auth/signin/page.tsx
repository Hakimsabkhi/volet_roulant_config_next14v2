'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, getProviders, ClientSafeProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignInPage: React.FC = () => {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        if (res) {
          setProviders(res);
        } else {
          setError('Failed to load authentication providers.');
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('An unexpected error occurred while loading providers. Please try again.');
      }
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });
  
      if (result?.ok) {
        router.push('/');
      } else {
        setError('Failed to sign in. Please check your email and password and try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[450px]">
        <h1 className="text-2xl max-md:text-xl text-center font-bold mb-6">Sign in</h1>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
      {showPassword ? <FaEye className="text-gray-600" />:<FaEyeSlash className="text-gray-600" />}
    </div>
  </div>
</div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-5 h-5 rounded bg-gray-400"
                aria-label="Remember me"
              />
              <label htmlFor="remember" className="ml-2 font-bold text-gray-400">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-600 font-bold">Forgot password?</a>
          </div>
          <div className="flex flex-col gap-2 items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
            >
              Sign In to your account
            </button>
            {providers && providers.google && (
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
              >
                Sign In with Google
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push('/auth/signup')}
              className="text-blue-600 hover:text-blue-400 font-bold py-2 px-4 w-full focus:shadow-outline"
            >
              Don&apos;t have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
