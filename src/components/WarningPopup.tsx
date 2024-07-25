import React from "react"; // Make sure to create and import the CSS file for styling
import exitIcon from "../assets/exit.png";
import { WarningPopupProps } from "../interfaces";
import Image from "next/image";

const WarningPopup: React.FC<WarningPopupProps> = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={onClose} className="close-button">
          <Image src={exitIcon} alt="Outside View" className="button-close" width={40} height={40}/>
        </button>
        <h3>Notification</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default WarningPopup;
