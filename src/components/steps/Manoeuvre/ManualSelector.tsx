import React from 'react';
import OptionSelector from './OptionSelector';
import { optionCommandeManuel } from '../../../assets/Data';
import { ManualSelectorProps } from "../../../interfaces";


const ManualSelector: React.FC<ManualSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={optionCommandeManuel}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="manual"
    />
  );
}
export default ManualSelector;
