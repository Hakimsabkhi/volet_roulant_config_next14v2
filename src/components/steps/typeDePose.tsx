import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPoseInstalled, selectPoseInstalled } from "../../store/voletSlice";
import { poseOptions } from "../../assets/Data";
import { TypeDePoseProps } from "../../interfaces";
import Image from "next/image";

function TypeDePose({ enableNextButton }: TypeDePoseProps) {
  const dispatch = useDispatch();
  const poseInstalled = useSelector(selectPoseInstalled);
  const [hoveredChoice, setHoveredChoice] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  useEffect(() => {
    enableNextButton(poseInstalled !== "");
  }, [poseInstalled, enableNextButton]);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLLabelElement>,
    choice: any
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const translateYValue = window.innerHeight * 0.12; // 12% of viewport height
    setPopupPosition({
      top: rect.top + window.scrollY - translateYValue,
      left: rect.left + rect.width,
    });
    setHoveredChoice(choice);
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-[5px]">
        {poseOptions.map((choice) => (
          <label
            key={choice.label}
            className={`${
              choice.label === poseInstalled
                ? "selected flex text-[#000] bg-[#fff] rounded-[5px] p-[6px] gap-[20px] cursor-pointer"
                : "flex bg-secondary rounded-[5px] p-[6px] gap-[20px] cursor-pointer hover:bg-cwhite hover:text-cblack"
            }`}
            onMouseEnter={(e) => handleMouseEnter(e, choice)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            <Image
              src={choice.image}
              alt={choice.label}
              width={100}
              height={100}
              className="w-12 h-auto md:w-16 lg:w-20 xl:w-24 rounded-[5px]"
              style={{ objectFit: "contain" }}
              quality={75}
              // For the selected image, use priority to load it quickly
              priority={choice.label === poseInstalled}
              // Otherwise, use lazy loading for non-selected images
              loading={choice.label !== poseInstalled ? "lazy" : undefined}
            />

            <div className="flex flex-col justify-center items-center text-center gap-[5px]">
              <div>
                <h3 className="text-base max-md:text-sm">{choice.label}</h3>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={choice.label === poseInstalled}
                  id={`checkbox-${choice.label}`}
                  onChange={() => dispatch(setPoseInstalled(choice.label))}
                  required
                />
                <label htmlFor={`checkbox-${choice.label}`}></label>
              </div>
              <p className="text-xs font-extralight max-md:hidden text-center">
                {choice.description}
              </p>
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
          <h2 className="text-sm uppercase font-semibold">
            {hoveredChoice.label}
          </h2>
          <Image
            src={hoveredChoice.image}
            alt={hoveredChoice.label}
            width={100}
            height={100}
            className="max-md:hidden"
            quality={75}
            // Load the hovered image eagerly for a better UX
            loading="eager"
            style={{ objectFit: "contain" }}
          />
          <p className="text-xs">{hoveredChoice.description}</p>
        </div>
      )}
    </div>
  );
}

export default TypeDePose;
