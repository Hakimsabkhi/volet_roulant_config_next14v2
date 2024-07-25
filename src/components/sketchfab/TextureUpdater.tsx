import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectColorForCategory} from '../../store/voletSlice';
import { ColorImages } from '../../assets/Data';
import { RootState } from '../../store';
import TextureUpdateHandler from './TextureUpdateHandler'; // Adjust the import path as needed
import { TextureUpdaterProps } from "../../interfaces";

const TextureUpdater: React.FC<TextureUpdaterProps> = ({ apiClient, textureType, textureId, setTexture }) => {
  const color = useSelector((state: RootState) => selectColorForCategory(textureType)(state)) || 'Blanc';
  const [textureURL, setTextureURL] = useState<string | null>(null);

  useEffect(() => {
    const url = ColorImages[textureType][color as keyof typeof ColorImages[typeof textureType]];
    if (!url) {
      console.error(`Invalid texture URL for ${textureType} with color ${color}`);
      return;
    }
    setTextureURL(url);
  }, [color, textureType]);

  return textureURL && apiClient ? (
    <TextureUpdateHandler
      apiClient={apiClient}
      textureURL={textureURL}
      textureId={textureId}
      setTexture={setTexture}
    />
  ) : null;
};

export default TextureUpdater;
