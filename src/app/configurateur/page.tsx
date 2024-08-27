"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from '../../store'; // Adjust the import path according to your project structure
import Viewer from '../../components/sketchfab/Viewer';
import UserDropdown from '../../components/Dropdown'; // Adjust the import path according to your project structure
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setVoletFromDevis } from '@/store/voletSlice'; // Adjust the import path according to your project structure

const ConfigurateurContent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      // Fetch the Devis data based on the id from the backend
      fetch(`/api/getDevisByID?id=${id}`)
        .then((response) => response.json())
        .then((selectedDevis) => {
          if (selectedDevis) {
            // Dispatch the selected Devis data to the volet slice
            dispatch(setVoletFromDevis({
              lameSelected: selectedDevis.lameSelected,
              dimensions: selectedDevis.dimensions,
              selectedColor: {
                coulisse: selectedDevis.selectedCoulisseColor,
                tablier: selectedDevis.selectedTablierColor,
                lameFinale: selectedDevis.selectedLameFinaleColor,
              },
              poseInstalled: selectedDevis.poseInstalled,
              manoeuvreSelected: selectedDevis.manoeuvreSelected,
              commandeManualSelected: selectedDevis.commandeManualSelected || "",
              optionMotorisationSelected: selectedDevis.optionMotorisationSelected,
              optionTelecomandeSelected: selectedDevis.optionTelecomandeSelected || "",
              optionInterrupteurSelected: selectedDevis.optionInterrupteurSelected || "",
              sortieDeCableSelected: selectedDevis.sortieDeCableSelected || "",
              multiplier: selectedDevis.multiplier || 1, // Include multiplier, default to 1 if not present
            }));
          }
        })
        .catch((error) => {
          console.error("Error loading Devis data:", error);
        });
    }
  }, [dispatch, searchParams]);

  if (status === "loading") {
    return;
  }

  if (!session) {
    router.push("/auth/signin"); // Redirect to sign-in if not authenticated
    return;
  }
  return (
    <div className="w-full h-full text-[#fff]">
      <Viewer setPosition={setPosition} setTarget={setTarget} />
    </div>
  );
};

const WrappedConfigurateur: React.FC = () => (
  <Provider store={store}>
    <Suspense fallback={<div>Loading configuration...</div>}>
      <ConfigurateurContent />
    </Suspense>
  </Provider>
);

export default WrappedConfigurateur;
