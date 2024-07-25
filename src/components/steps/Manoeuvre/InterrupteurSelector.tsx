// InterrupteurSelector.tsx
import React from 'react';
import OptionSelector from './OptionSelector';
import { optionsInterrupteur } from '../../../assets/Data';
import { InterrupteurSelectorProps } from "../../../interfaces";

const InterrupteurSelector: React.FC<InterrupteurSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={optionsInterrupteur}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="interrupteur"
    />
  );
}

export default InterrupteurSelector;
