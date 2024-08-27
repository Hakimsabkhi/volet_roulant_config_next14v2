// src/app/configurateur/layout.tsx
import React, { ReactNode } from 'react';
import UserSection from '@/components/UserSection';

interface ConfigurateurLayoutProps {
  children: ReactNode;
}

const ConfigurateurLayout: React.FC<ConfigurateurLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-10 w-full h-screen">
    <div className="fixed top-[3%] right-[3%] z-[1000] flex gap-4">
      <UserSection />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default ConfigurateurLayout;
