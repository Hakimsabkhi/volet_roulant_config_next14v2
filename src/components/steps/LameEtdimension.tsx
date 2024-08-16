import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLameSelected, setDimensions } from "../../store/voletSlice";
import { lameChoices } from "../../assets/Data";
import { RootState } from "../../store";
import { LameEtDimensionProps } from "../../interfaces";
import Image from "next/image";

const LameEtDimension: React.FC<LameEtDimensionProps> = ({
  setSelections,
  selections,
  enableNextButton,
}) => {
  const dispatch = useDispatch();
  const lameSelected = useSelector(
    (state: RootState) => state.volet.lameSelected
  );
  const dimensions = useSelector((state: RootState) => state.volet.dimensions);
  const [hoveredChoice, setHoveredChoice] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const isEnabled =
      lameSelected !== "" &&
      dimensions.Largeur >= 600 &&
      dimensions.Hauteur >= 600;
    console.log(`Enabling button: ${isEnabled}`);
    enableNextButton(isEnabled);
  }, [lameSelected, dimensions, enableNextButton]);

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

  const handleLameChoice = (lameChoice: any) => {
    dispatch(setLameSelected(lameChoice.label));

    const newMaxWidth = lameChoice.label === "Lame 41" ? 3000 : 3500;
    const newMaxHeight = lameChoice.label === "Lame 41" ? 2700 : 3000;

    if (dimensions.Largeur > newMaxWidth) {
      dispatch(setDimensions({ ...dimensions, Largeur: newMaxWidth }));
    }

    if (dimensions.Hauteur > newMaxHeight) {
      dispatch(setDimensions({ ...dimensions, Hauteur: newMaxHeight }));
    }
  };

  const handleDimensionChange = (dimensionName: string, value: string) => {
    // Remove leading zeros
    const newValue = value.replace(/^0+/, "");
    if (!/^\d*$/.test(newValue)) return; // Prevent non-numeric input
    dispatch(
      setDimensions({ ...dimensions, [dimensionName]: Number(newValue) })
    );
  };

  const handleBlur = (dimensionName: string, value: string) => {
    let newValue = Number(value);
    let min = 600;
    let max =
      dimensionName === "Largeur"
        ? lameSelected === "Lame 41"
          ? 3000
          : 3500
        : lameSelected === "Lame 41"
        ? 2700
        : 3000;
    newValue = Math.max(Math.min(newValue, max), min);
    dispatch(setDimensions({ ...dimensions, [dimensionName]: newValue }));
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[5px] max-md:flex-row w-full">
        {lameChoices.map((choice, index) => (
          <label
            key={index}
            onClick={() => handleLameChoice(choice)}
            className={`${
              choice.label === lameSelected
                ? "flex text-[#000] bg-[#fff] rounded-[5px] p-[5px] gap-[20px] cursor-pointer w-full"
                : "flex bg-secondary rounded-[5px] p-[5px] gap-[20px] cursor-pointer hover:bg-cwhite hover:text-cblack w-full"
            }`}
            onMouseEnter={(e) => handleMouseEnter(e, choice)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            <Image
              loading="eager"
              src={choice.image}
              alt={choice.label}
              className="max-md:hidden"
              width={70}
              style={{ width: "auto", height: "auto" }}
            />
            <div className="flex flex-col justify-center items-center gap-[5px] w-full">
              <h3 className="text-base">{choice.label}</h3>
              <input
                type="checkbox"
                id={`checkbox-${choice.label}`}
                name={`checkbox-${choice.label}`}
                checked={lameSelected === choice.label}
                onChange={() => handleLameChoice(choice)}
                className="hidden"
                required
              />
              <p className="text-xs font-extralight max-md:hidden text-center">
                {choice.description}
              </p>
            </div>
          </label>
        ))}
      </div>
      {hoveredChoice && (
        <div
          className="absolute flex flex-col justify-center items-center gap-[10px] text-center w-[200px] p-[10px] bg-[rgba(5,30,80,1)] border-2 border-cwhite rounded-[5px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] z-[10] text-[10px]"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <h2 className="choice-label">{hoveredChoice.label}</h2>
          <Image
            className="popup-image"
            src={hoveredChoice.image}
            alt={hoveredChoice.label}
            width={100}
            style={{ width: "auto", height: "auto" }}
          />
          <p>{hoveredChoice.description}</p>
        </div>
      )}

      <div className="flex gap-[10px] justify-center text-[12px]">
        <div className="w-full flex justify-around flex-col h-full items-center gap-[5px]">
          <h3 className="w-[90%] text-sm max-md:text-xs">
            Largeur en mm (min: 600 mm - max:{" "}
            {lameSelected === "Lame 41" ? 3000 : 3500}):
          </h3>
          <input
            type="number"
            id="Largeur"
            className="w-full h-[40px] rounded-[5px] border border-cblack text-center font-bold text-[16px] text-cblack"
            value={dimensions.Largeur === 0 ? "" : dimensions.Largeur}
            onChange={(e) => handleDimensionChange("Largeur", e.target.value)}
            onBlur={(e) => handleBlur("Largeur", e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            min="600"
            max={lameSelected === "Lame 41" ? 3000 : 3500}
          />
        </div>
        <div className="w-full flex justify-around flex-col h-full items-center gap-[5px]">
          <h3 className="w-[90%] text-sm max-md:text-xs">
            Hauteur en mm (min: 600 mm - max:{" "}
            {lameSelected === "Lame 41" ? 2700 : 3000}):
          </h3>
          <input
            type="number"
            id="Hauteur"
            className="w-full h-[40px] rounded-[5px] border border-cblack text-center font-bold text-[16px] text-cblack"
            value={dimensions.Hauteur === 0 ? "" : dimensions.Hauteur}
            onChange={(e) => handleDimensionChange("Hauteur", e.target.value)}
            onBlur={(e) => handleBlur("Hauteur", e.target.value)}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            min="600"
            max={lameSelected === "Lame 41" ? 2700 : 3000}
          />
        </div>
      </div>
    </div>
  );
};

export default LameEtDimension;
