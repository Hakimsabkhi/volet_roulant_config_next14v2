// LoadingOverlay.tsx
import React from 'react';
import Image from 'next/image';
import logo from '../assets/logovs.png';

import './LoadingOverlay.css';
import { LoadingOverlayProps } from "../../interfaces";

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isBlurred, progress }) => {
  return isBlurred ? (
    <div className="loading-Viewer">
    <Image 
          src={logo} 
          alt="Logo" 
          className="opacity-0 fade-animation" 
          priority 
        />
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  ) : null;
};

export default LoadingOverlay;
