import React from 'react';
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown';

const UserSection: React.FC = () => {
  const { data: session } = useSession();

  return (    
    <Dropdown
      userName={session?.user?.name || 'Guest User'}
      userEmail={session?.user?.email || 'guest@example.com'}
    />
  );
};

export default UserSection;
