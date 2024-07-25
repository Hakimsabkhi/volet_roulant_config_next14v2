import React from 'react';
import OptionSelector from './OptionSelector';
import { optionsMotorisations } from '../../../assets/Data'; 
import { MotoriseSelectorProps } from "../../../interfaces";

const MotoriseSelector: React.FC<MotoriseSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={optionsMotorisations}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="motorise"
    />
  );
}

export default MotoriseSelector;
