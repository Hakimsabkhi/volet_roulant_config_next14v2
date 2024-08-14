import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setManoeuvreSelected, setCommandeManualSelected, setOptionMotorisationSelected, setOptionTelecommandeSelected, setOptionInterrupteurSelected, setSortieDeCableSelected } from '../../store/voletSlice';
import ManualSelector from './Manoeuvre/ManualSelector';
import MotoriseSelector from './Manoeuvre/MotoriseSelector';
import TelecommandeSelector from './Manoeuvre/TelecommandeSelector';
import InterrupteurSelector from './Manoeuvre/InterrupteurSelector';
import SortieDeCableSelector from './Manoeuvre/SortieDeCableSelector';
import OptionSelector from './Manoeuvre/OptionSelector';
import { optionManoeuvre, manoeuvreConfig } from '../../assets/Data';
import useMediaQuery from './useMediaQuery';
import { ManoeuvreProps } from "../../interfaces";

const Manoeuvre: React.FC<ManoeuvreProps> = ({ enableNextButton }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { manoeuvreSelected, commandeManualSelected, optionMotorisationSelected, optionTelecomandeSelected, optionInterrupteurSelected, sortieDeCableSelected } = useSelector((state: RootState) => state.volet);
  const isMobile = useMediaQuery('(max-width: 1050px)');
  const [loading, setLoading] = useState(false);
  const [visibleSection, setVisibleSection] = useState<'Manoeuvre' | 'Manual' | 'Motorise' | 'Telecommande' | 'Interrupteur' | 'SortieDeCable'>('Manoeuvre');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    let isEnabled = false;
    if (manoeuvreSelected === 'Manuel') {
      isEnabled = commandeManualSelected !== '';
      dispatch(setOptionTelecommandeSelected(''));
      dispatch(setOptionInterrupteurSelected(''));
      dispatch(setSortieDeCableSelected(''));
    } else if (manoeuvreSelected === 'Motorisé') {
      if (optionMotorisationSelected) {
        if (optionMotorisationSelected === 'Radio') {
          isEnabled = optionTelecomandeSelected !== '';
        } else if (optionMotorisationSelected === 'Filaire') {
          isEnabled = optionInterrupteurSelected !== '' && sortieDeCableSelected !== '';
        }
      }
    }
    enableNextButton(isEnabled);

    if (
      isMobile &&
      (
        (manoeuvreSelected === 'Manuel' && commandeManualSelected !== '') ||
        (manoeuvreSelected === 'Motorisé' && (
          (optionMotorisationSelected === 'Radio' && optionTelecomandeSelected !== '') ||
          (optionMotorisationSelected === 'Filaire' && optionInterrupteurSelected !== '' && sortieDeCableSelected !== '')
        ))
      )
    ) {
      setIsConfigured(true);
    } else {
      setIsConfigured(false);
    }
  }, [manoeuvreSelected, commandeManualSelected, optionMotorisationSelected, optionTelecomandeSelected, optionInterrupteurSelected, sortieDeCableSelected, enableNextButton, dispatch, isMobile]);

  const handleChange = (setType: (type: string) => { type: string, payload: string }) => (option: { label: string }) => {
    if (isMobile) {
      setLoading(true);
      setTimeout(() => {
        dispatch(setType(option.label));
        setLoading(false);
        if (setType === setManoeuvreSelected) {
          setVisibleSection(option.label === 'Manuel' ? 'Manual' : 'Motorise');
          if (option.label === 'Manuel') {
            dispatch(setOptionMotorisationSelected(''));
            dispatch(setOptionTelecommandeSelected(''));
            dispatch(setOptionInterrupteurSelected(''));
            dispatch(setSortieDeCableSelected(''));
          }
        } else if (setType === setOptionMotorisationSelected) {
          setVisibleSection(option.label === 'Radio' ? 'Telecommande' : 'Interrupteur');
        } else if (setType === setOptionInterrupteurSelected) {
          setVisibleSection('SortieDeCable');
        }
      }, 1000); // Simulate loading delay
    } else {
      dispatch(setType(option.label));
      if (setType === setManoeuvreSelected) {
        setVisibleSection(option.label === 'Manuel' ? 'Manual' : 'Motorise');
        if (option.label === 'Manuel') {
          dispatch(setOptionMotorisationSelected(''));
          dispatch(setOptionTelecommandeSelected(''));
          dispatch(setOptionInterrupteurSelected(''));
          dispatch(setSortieDeCableSelected(''));
        }
      } else if (setType === setOptionMotorisationSelected) {
        setVisibleSection(option.label === 'Radio' ? 'Telecommande' : 'Interrupteur');
      } else if (setType === setOptionInterrupteurSelected) {
        setVisibleSection('SortieDeCable');
      }
    }
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
    setVisibleSection('Manoeuvre');
    dispatch(setManoeuvreSelected(''));
    dispatch(setCommandeManualSelected(''));
    dispatch(setOptionMotorisationSelected(''));
    dispatch(setOptionTelecommandeSelected(''));
    dispatch(setOptionInterrupteurSelected(''));
    dispatch(setSortieDeCableSelected(''));
  };

  return (
    <div className="w-full flex flex-col justify-around gap-[10px]  max-md:min-h-[100px] ">
      {isMobile && isConfigured ? (
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-center">Votre volet est bien configuré</h2>
          <button onClick={handleReconfigure} className="nav-btn hover:bg-NavbuttonH">Reconfigure</button>
        </div>
      ) : (
        <>
          {(!isMobile || visibleSection === 'Manoeuvre') && !loading && (
            <OptionSelector options={optionManoeuvre} selectedOption={manoeuvreSelected} handleChange={handleChange(setManoeuvreSelected)} type="choice" />
          )}
          {(!isMobile || visibleSection === 'Manual') && manoeuvreSelected === 'Manuel' && !loading && (
            <div className="flex flex-col gap-[5px]">
              <h3 className="text-base max-md:text-center">{manoeuvreConfig[0]}</h3>
              <div className="OptionSection">
                <ManualSelector selectedOption={commandeManualSelected} handleChange={handleChange(setCommandeManualSelected)} />
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'Motorise') && manoeuvreSelected === 'Motorisé' && !loading && (  
              <div className="flex flex-col gap-[5px]">
                <h3 className="text-base max-md:text-center">{manoeuvreConfig[1]}</h3>
                <div className="OptionSection">
                  <MotoriseSelector selectedOption={optionMotorisationSelected} handleChange={handleChange(setOptionMotorisationSelected)} />
                </div>
              </div>          
          )}
          {(!isMobile || visibleSection === 'Telecommande') && optionMotorisationSelected === 'Radio' && !loading && (
            <div className="flex flex-col gap-[5px]">
              <div><h3 className="text-base max-md:text-center">{manoeuvreConfig[2]}</h3></div>
              <div className="OptionSection">
                <TelecommandeSelector selectedOption={optionTelecomandeSelected} handleChange={handleChange(setOptionTelecommandeSelected)} />
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'Interrupteur') && optionMotorisationSelected === 'Filaire' && !loading && (
            <div className="flex flex-col gap-[5px]">
              <h3 className="text-base max-md:text-center">{manoeuvreConfig[3]}</h3>
              <div className="OptionSection">
                <InterrupteurSelector selectedOption={optionInterrupteurSelected} handleChange={handleChange(setOptionInterrupteurSelected)} />
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'SortieDeCable') && optionMotorisationSelected === 'Filaire' && !loading && (
            <div className="flex flex-col gap-[5px]">
              <h3 className="text-base max-md:text-center">{manoeuvreConfig[4]}</h3>
              <div className="OptionSection">
                <SortieDeCableSelector selectedOption={sortieDeCableSelected} handleChange={handleChange(setSortieDeCableSelected)} />
              </div>
            </div>
          )}      
          {loading && <div className="border-4 border-solid border-cwhite border-t-4 border-t-secondary rounded-full w-10 h-10 animate-spin mx-auto"></div>}              
        </>
      )}
    </div>
  );
};

export default Manoeuvre;
