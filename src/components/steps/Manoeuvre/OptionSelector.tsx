import React, { useState, useRef } from "react";
import { Option, OptionSelectorProps } from "../../../interfaces";
import Image from "next/image";


const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedOption,
  handleChange,
  type,
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<Option | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLLabelElement>,
    option: Option
  ) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const translateYValue = window.innerHeight * 0.12; // 12% of viewport height
    if (containerRect) {
      setPopupPosition({
        top: containerRect.top + window.scrollY - translateYValue,
        left: containerRect.right,
      });
    }
    setHoveredChoice(option);
  };

  return (
    <div className="flex flex-col">
      <div ref={containerRef} className="w-full flex max-md:flex-col justify-center gap-[5px]">
        {options.map((option, index) => (
          <label
            key={index}
            onClick={() => handleChange(option)}
            className={`${
              option.label === selectedOption ? "bg-[#ffffff] text-[#000] border-[2px] border-[rgb(255,255,255)] rounded-[5px] w-full" : "bg-[rgba(5,30,80,1)] border-[2px] border-[#fff] rounded-[5px] w-full hover:bg-[#ffffff] hover:text-[#000]"
            }`}
            onMouseEnter={(e) => handleMouseEnter(e, option)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            
              <div className="flex justify-center p-1">
                <h3 className="choice-label">{option.label}</h3>
                <input
                  type="checkbox"
                  id={`checkbox-${option.label}-${type}`}
                  name={`checkbox-${option.label}-${type}`}
                  checked={option.label === selectedOption}
                  onChange={() => {}}
                  className="hidden"
                />
              </div>
        
          </label>
        ))}
      </div>
      {hoveredChoice && (
        <div
          className="popup-info"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <h2 className="choice-label">{hoveredChoice.label}</h2>
          {hoveredChoice.image && (
            <Image
              className="popup-image"
              src={hoveredChoice.image}
              alt={hoveredChoice.label}
            />
          )}
          <p>{hoveredChoice.description}</p>
        </div>
      )}
    </div>
  );
};

export default OptionSelector;
