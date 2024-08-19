"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CreateDevisButton from '@/components/CreateDevisButton';
import Card from '@/components/Card';
import UserSection from '@/components/UserSection';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  
  const excludedPaths = ['/configurateur', '/auth/signin'];

  if (excludedPaths.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex gap-4 justify-between h-full">
      <Sidebar />
      <div className="flex flex-col gap-10 w-full h-screen">
        <div className="fixed top-4 right-10 z-[1000] flex gap-4">
          <CreateDevisButton />
          <Card/>
          <UserSection />
        </div>
        <div className="mt-32 ml-64 flex flex-col gap-8 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
