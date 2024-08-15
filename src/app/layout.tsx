import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import SessionProviderWrapper from '../components/SessionProviderWrapper';
import Providers from '../components/Providers';
import ClientLayout from '@/components/ClientLayout'; // Import the client component

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProviderWrapper>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
