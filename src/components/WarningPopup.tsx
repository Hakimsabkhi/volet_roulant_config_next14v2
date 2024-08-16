import React from "react"; // Make sure to create and import the CSS file for styling
import exitIcon from "../assets/exit.png";
import { WarningPopupProps } from "../interfaces";
import Image from "next/image";

const WarningPopup: React.FC<WarningPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-1000 transition-opacity duration-300 ease-in-out opacity-100">
      <div className="bg-[#e46148] rounded-[10px] text-center w-[30%] max-md:w-[80%] h-fit flex gap-1 flex-col justify-center px-2 py-2 transition-transform duration-300 ease-in-out transform translate-y-0 pb-6">
        <button onClick={onClose} className="bg-none border-none flex justify-end">
          <Image src={exitIcon} loading="eager" alt="Outside View" width={30} height={30}/>
        </button>
        <h3 className="text-2xl max-md:text-xl font-bold uppercase"> Notification </h3>
        <p className="text-xl max-md:text-sm">{message}</p>
      </div>
    </div>
  );
};

export default WarningPopup;
