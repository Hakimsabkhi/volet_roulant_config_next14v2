"use client";

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../store'; // Adjust the import path according to your project structure
import Viewer from '../../components/sketchfab/Viewer';
import UserDropdown from '../../components/UserDropdown'; // Adjust the import path according to your project structure
import { useSession } from 'next-auth/react';

const Configurateur: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-full text-[#fff]">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <div className="absolute top-4 right-16 z-[1000] flex gap-4">
        <UserDropdown 
          userName={session.user?.name || "User"} 
          userEmail={session.user?.email || "user.email@example.com"} 
        /></div>
      ) : (
        <p>Redirecting to sign-in...</p>
      )}
      <Viewer setPosition={setPosition} setTarget={setTarget} />
    </div>
  );
};

const WrappedConfigurateur: React.FC = () => (
  <Provider store={store}>
    <Configurateur />
  </Provider>
);

export default WrappedConfigurateur;
