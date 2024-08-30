import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/authOptions';
import Providers from '../components/Providers';
import ClientLayout from '@/components/ClientLayout'; 
import SessionProviderWrapper from '../components/SessionProviderWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useMemo } from 'react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <RootLayoutClient session={session}>
      {children}
    </RootLayoutClient>
  );
}

const RootLayoutClient: React.FC<{ session: any, children: React.ReactNode }> = ({ session, children }) => {
  // Memoize the session data to avoid unnecessary recomputation
  const memoizedSession = useMemo(() => session, [session]);

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProviderWrapper session={memoizedSession}>
          <Providers>
            <ClientLayout>
              <ToastContainer 
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              {children}
            </ClientLayout>
          </Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
