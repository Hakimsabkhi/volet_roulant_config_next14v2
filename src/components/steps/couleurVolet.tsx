import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../store/voletSlice';
import { ColorImages } from '../../assets/Data';
import { RootState } from '../../store'; 
import useMediaQuery from './useMediaQuery';
import { SelectedColor, CouleurVoletProps } from "../../interfaces";

const CouleurVolet: React.FC<CouleurVoletProps> = ({ enableNextButton, setIsMobileConfigured }) => {
  const dispatch = useDispatch(); 
  const selectedColors: SelectedColor = useSelector((state: RootState) => state.volet.selectedColor);
  const isMobile = useMediaQuery('(max-width: 1050px)');
  const [loading, setLoading] = useState(false);
  const [visibleSection, setVisibleSection] = useState<keyof SelectedColor>('coulisse');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const allSelected = Object.keys(ColorImages).every(
      (category) => selectedColors[category as keyof SelectedColor] && selectedColors[category as keyof SelectedColor] !== ''
    );
    enableNextButton(allSelected);

    if (isMobile && allSelected) {
      setIsConfigured(true);
      setIsMobileConfigured(true); 
    } else {
      setIsConfigured(false);
      setIsMobileConfigured(false); 
    }
  }, [selectedColors, enableNextButton, isMobile, setIsMobileConfigured]);

  const handleColorSelection = (colorName: string, category: keyof SelectedColor) => {
    if (isMobile) {
      setLoading(true);
      setTimeout(() => {
        dispatch(setColor({ color: colorName, category }));
        setLoading(false);
        if (category === 'coulisse') setVisibleSection('tablier');
        if (category === 'tablier') setVisibleSection('lameFinale');
        if (category === 'lameFinale') setIsConfigured(true);
      }, 1000); // Simulate loading delay
    } else {
      dispatch(setColor({ color: colorName, category }));
      if (category === 'coulisse') setVisibleSection('tablier');
      if (category === 'tablier') setVisibleSection('lameFinale');
      if (category === 'lameFinale') setIsConfigured(true);
    }
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
    setIsMobileConfigured(false); 
    setVisibleSection('coulisse');
    // Optionally reset selected colors
    dispatch(setColor({ color: '', category: 'coulisse' }));
    dispatch(setColor({ color: '', category: 'tablier' }));
    dispatch(setColor({ color: '', category: 'lameFinale' }));
  };

  const renderColorChoices = (category: keyof SelectedColor) => {
    const colors = ColorImages[category] || {};
    return Object.entries(colors).map(([colorName, colorCode]) => (
      <div
        key={`${category}-${colorName}`}
        className={`${colorName === selectedColors[category] ? "selected flex-[1_0_30%] flex flex-col justify-center items-center gap-[5px] text-center text-[12px] p-[5px] cursor-pointer rounded-[3px] border-2 text-cblack border-cwhite bg-[#ffffff] hover:bg-[#ffffff] hover:text-cblack "
          : "flex-[1_0_30%] flex flex-col justify-center items-center gap-[5px] text-center text-[12px] p-[5px] cursor-pointer rounded-[3px] border-2 border-cwhite bg-[rgba(5,30,80,1)] hover:bg-[#ffffff] hover:text-cblack max-md:text-[10px] "
      }`}
        onClick={() => handleColorSelection(colorName, category)}
        style={{ cursor: 'pointer', textAlign: 'center' }}
      >
        <input
          type="checkbox"
          id={`label-${colorName}-${category}`}
          name={`color-${category}`}
          value={colorName}
          checked={colorName === selectedColors[category]}
          onChange={() => {}} 
          aria-labelledby={`label-${colorName}-${category}`}
          className="hidden"
          required
        />
        <div>
          <span>{colorName.replace(/-/g, ' ')}</span>
        </div>
      </div>
    ));
  };

  const renderSection = (section: keyof SelectedColor, title: string) => (
    <div className="flex flex-col justify-center gap-[10px]">
      <h3 className="max-md:text-center">{title}</h3>
      <div className="w-full flex">
        {loading ? (
          <div className="border-4 border-solid border-gray-200 border-t-4 border-t-primary rounded-full w-10 h-10 animate-spin mx-auto"></div>
        ) : (
          <div className="flex justify-center flex-wrap gap-[5px]">{renderColorChoices(section)}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col justify-around gap-[10px]">
      {isMobile && isConfigured ? (
        <div className="flex flex-col justify-center items-center text-cwhite text-center gap-[5px]">
          <p>Votre volet est bien colorisé</p>
          <button onClick={handleReconfigure} className="nav-btn hover:bg-NavbuttonH">Recoloriser</button>
        </div>
      ) : (
        <>
          {(!isMobile || visibleSection === 'coulisse') && renderSection('coulisse', 'Couleurs de Coffre et Coulisse')}
          {(!isMobile || visibleSection === 'tablier') && renderSection('tablier', 'Couleurs de Tablier')}
          {(!isMobile || visibleSection === 'lameFinale') && renderSection('lameFinale', 'Couleurs de Lame Finale')}
        </>
      )}
    </div>
  );
};
export default CouleurVolet;
