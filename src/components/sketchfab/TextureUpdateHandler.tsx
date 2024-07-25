import React, { useEffect } from 'react';
import { TextureUpdateHandlerProps } from "../../interfaces";

const TextureUpdateHandler: React.FC<TextureUpdateHandlerProps> = ({ apiClient, textureURL, textureId, setTexture }) => {
  useEffect(() => {
    if (apiClient && textureURL) {
      apiClient.updateTexture(textureURL, textureId, (err: any, newTextureUid: string) => {
        if (err) {
          console.error('Failed to update texture:', err);
          return;
        }

        console.log(`Replaced texture with UID: ${newTextureUid}`);

        apiClient.getMaterialList((err: any, materials: any[]) => {
          if (err) {
            console.error('Failed to get material list:', err);
            return;
          }

          const materialToUpdate = materials.find((material: any) => material.id === textureId);
          if (!materialToUpdate) {
            console.error(`Material with ID ${textureId} not found`);
            return;
          }

          const updatedMaterial = { ...materialToUpdate };

          if (updatedMaterial.channels) {
            // Update the base color (AlbedoPBR)
            if (updatedMaterial.channels.AlbedoPBR) {
              updatedMaterial.channels.AlbedoPBR.texture = { uid: newTextureUid };
              console.log('AlbedoPBR texture updated');
            }

            // Update the emission
            if (updatedMaterial.channels.EmitColor) {
              updatedMaterial.channels.EmitColor.texture = { uid: newTextureUid };
              console.log('Emission texture updated');
            }
          }

          apiClient.setMaterial(updatedMaterial, (err: any) => {
            if (err) {
              console.error('Failed to update material:', err);
            } else {
              setTexture(newTextureUid);
              console.log('Material updated successfully');
            }
          });
        });
      });
    }
  }, [apiClient, textureURL, textureId, setTexture]);

  return null;
};

export default TextureUpdateHandler;
