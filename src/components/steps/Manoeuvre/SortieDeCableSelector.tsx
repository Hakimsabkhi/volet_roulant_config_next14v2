import React from 'react';
import OptionSelector from './OptionSelector';
import { sortieDeCable } from '../../../assets/Data';
import { SortieDeCableSelectorProps } from "../../../interfaces";

const SortieDeCableSelector: React.FC<SortieDeCableSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={sortieDeCable}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="sortieDeCable"
    />
  );
}

export default SortieDeCableSelector;
