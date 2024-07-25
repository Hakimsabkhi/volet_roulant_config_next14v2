import React, { useEffect } from 'react';
import { APIDataFetcherProps  } from "../../interfaces";

const APIDataFetcher: React.FC<APIDataFetcherProps> = ({ apiClient }) => {
  useEffect(() => {
    if (apiClient) {
      apiClient.getTextureList((err: any, textures: any[]) => {
        if (!err) {
          console.log('Textures:', textures);
        } else {
          console.error('Failed to get texture list:', err);
        }
      });

      apiClient.getNodeMap((err: any, nodes: any[]) => {
        if (!err) {
          console.log('Nodes:', nodes);
        } else {
          console.error('Failed to get node map:', err);
        }
      });

      apiClient.getMaterialList((err: any, materials: any[]) => {
        if (err) {
          console.error('Failed to get material list:', err);
          return;
        }
        console.log('Materials:', materials);
      });
    }
  }, [apiClient]);

  return null;
};

export default APIDataFetcher;
