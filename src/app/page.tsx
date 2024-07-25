"use client";

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store'; // Adjust the import path according to your project structure
import Viewer from '../components/sketchfab/Viewer';
import MultiStepMenu from '../components/MultiStepMenu';
import { ConfigIconIcon } from '../assets/imageModule';
import Image from 'next/image';
import LoadingScreen from '../components/LoadingScreen';
import CameraPosition from "../components/sketchfab/CameraPosition";

const Home: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelectionsChange = (selections: any) => {};

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="w-full h-full text-[#fff]">
      <Viewer setPosition={setPosition} setTarget={setTarget} />
      <div className="absolute top-[5%] left-[3%] w-[50%] flex items-center gap-[2%] max-md:w-full max-md:top-[2%] max-md:left-[0%] max-md:justify-center max-md:gap-[5%]">
        <button className="w-[50px] h-[50px] bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite focus:bg-cwhite " onClick={toggleMenu}>
          <Image src={ConfigIconIcon} alt="Config Icon" className="button-icon" width={40} height={40} />
        </button>
        <h2 className=' max-md:text-base w-fit h-full text-2xl uppercase font-base'>Configurer mon volet</h2>
      </div>
      {menuVisible && (
        <div className="absolute w-[23%] flex flex-col top-[12%] left-[3%] z-[1000] max-md:top-auto max-md:w-[93%] max-md:bottom-[3%] max-md:justify-end">
          <MultiStepMenu onSelectionsChange={handleSelectionsChange} />
          {/* <CameraPosition position={position} setPosition={setPosition} target={target} setTarget={setTarget} /> */}
        </div>
      )}
    </div>
  );
};

const WrappedHome: React.FC = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default WrappedHome;
