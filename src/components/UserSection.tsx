"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import UserDropdown from './UserDropdown';

const UserSection: React.FC = () => {
  const { data: session } = useSession();

  return (
    <UserDropdown
      userName={session?.user?.name || 'Guest User'}
      userEmail={session?.user?.email || 'guest@example.com'}
    />
  );
};

export default UserSection;
