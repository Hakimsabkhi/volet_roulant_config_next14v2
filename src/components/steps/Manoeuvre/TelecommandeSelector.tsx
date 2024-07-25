import React from 'react';
import OptionSelector from './OptionSelector';
import { optionsTelecomande } from '../../../assets/Data';
import { TelecommandeSelectorProps } from "../../../interfaces";

const TelecommandeSelector: React.FC<TelecommandeSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={optionsTelecomande}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="telecommande"
    />
  );
}

export default TelecommandeSelector;
