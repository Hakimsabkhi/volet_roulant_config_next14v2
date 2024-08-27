"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown';

const UserSection: React.FC = () => {
  const { data: session } = useSession();

  console.log('Session Data Client-Side:', session); // This should show the correct roleasync jwt({ token, user }:

  return (
    <Dropdown
      userName={session?.user?.name || 'Guest User'}
      userEmail={session?.user?.email || 'guest@example.com'}
      userRole={session?.user?.role || 'Guest'}  // Ensure role is passed correctly
    />
  );
};

export default UserSection;
