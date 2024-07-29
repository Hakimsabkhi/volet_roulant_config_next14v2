"use client";

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store'; // Adjust the import path according to your project structure
import Viewer from '../components/sketchfab/Viewer';

const Home: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });

  return (
    <div className="w-full h-full text-[#fff]">
      <Viewer setPosition={setPosition} setTarget={setTarget} />
    </div>
  );
};

const WrappedHome: React.FC = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default WrappedHome;
