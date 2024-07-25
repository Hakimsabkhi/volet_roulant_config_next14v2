"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../assets/logovs.png';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 100 : prevProgress + 5));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#f0f0f0] flex justify-center items-center">
      <div className="text-center text-cwhite">
        <Image 
          src={logo} 
          alt="Logo" 
          className="opacity-0 fade-animation" 
          priority 
        />
        <div className="w-[300px] h-[10px] bg-[rgba(10,10,10,0.2)] my-[20px] mx-auto">
          <div className="h-full bg-[rgb(27,34,97)]" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-[18px] text-cblack">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
