import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import "./PDFExport.css";

import {
  optionsMotorisations,
  optionsInterrupteur,
  optionsTelecomande,
  optionCommandeManuel,
  sortieDeCable,
  optionManoeuvre,
  poseOptions,
  lameChoices,
} from "../../assets/Data";

import { RootState  } from "../../interfaces";

const getPrice = (options: any[], selectedOption: string) => {
  const option = options.find((option) => option.label === selectedOption);
  return option ? option.price : 0;
};

const PDFExport: React.FC<{ dimensionCost: number; totalPrice: number }> = ({
  dimensionCost,
  totalPrice,
}) => {
  const selectedCoulisseColor = useSelector(
    (state: RootState) => state.volet.selectedColor.coulisse
  );
  const selectedTablierColor = useSelector(
    (state: RootState) => state.volet.selectedColor.tablier
  );
  const selectedLameFinaleColor = useSelector(
    (state: RootState) => state.volet.selectedColor.lameFinale
  );
  const lameSelected = useSelector(
    (state: RootState) => state.volet.lameSelected
  );
  const dimensions = useSelector((state: RootState) => state.volet.dimensions);
  const poseInstalled = useSelector(
    (state: RootState) => state.volet.poseInstalled
  );
  const manoeuvreSelected = useSelector(
    (state: RootState) => state.volet.manoeuvreSelected
  );
  const commandeManualSelected = useSelector((state: RootState) => state.volet.commandeManualSelected);
  const optionMotorisationSelected = useSelector(
    (state: RootState) => state.volet.optionMotorisationSelected
  );
  const optionTelecomandeSelected = useSelector(
    (state: RootState) => state.volet.optionTelecomandeSelected
  );
  const optionInterrupteurSelected = useSelector(
    (state: RootState) => state.volet.optionInterrupteurSelected
  );
  const sortieDeCableSelected = useSelector(
    (state: RootState) => state.volet.sortieDeCableSelected
  );

  const exportToPDF = () => {

    const doc = new jsPDF();
    
    // Add company details
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text("volet store", 10, 40);
    doc.text("Paris", 10, 45);
    doc.text("Address Line 2", 10, 50);
    doc.text("Phone: +123456789", 10, 55);
    doc.text("Email: contact@voletstore.fr", 10, 60);

    // Add client details
    doc.text("Client Name", 140, 40);
    doc.text("Client Address Line 1", 140, 45);
    doc.text("Client Address Line 2", 140, 50);
    doc.text("Client Phone", 140, 55);
    doc.text("Client Email", 140, 60);

    // Add table with details
    (doc as any).autoTable({
      startY: 70,
      head: [["Description", "Détails", "Prix"]],
      body: [
        [
          "Type de Lame",
          lameSelected,
          `${getPrice(lameChoices, lameSelected)}€`,
        ],
        [
          "Dimensions",
          `Largeur: ${dimensions.Largeur} mm, Hauteur: ${dimensions.Hauteur} mm`,
          `${dimensionCost.toFixed(2)}€`,
        ],
        [
          "Type d'Installation",
          poseInstalled,
          `${getPrice(poseOptions, poseInstalled)}€`,
        ],
        [
          "Couleurs",
          `Coulisse: ${selectedCoulisseColor} / Tablier: ${selectedTablierColor} / Lame Finale: ${selectedLameFinaleColor}`,
          "30€",
        ],
        [
          "Type de Manoeuvre",
          manoeuvreSelected,
          `${getPrice(optionManoeuvre, manoeuvreSelected)}€`,
        ],
        ...(manoeuvreSelected === "Manuel"
          ? [
              [
                "Outil de commande",
                commandeManualSelected,
                `${getPrice(optionCommandeManuel, commandeManualSelected)}€`,
              ],
            ]
          : []),
        ...(manoeuvreSelected === "Motorisé"
          ? [
              [
                "Type de motorisation",
                optionMotorisationSelected,
                `${getPrice(optionsMotorisations, optionMotorisationSelected)}€`,
              ],
              ...(optionMotorisationSelected === "Radio"
                ? [
                    [
                      "Télécommande",
                      optionTelecomandeSelected,
                      `${getPrice(optionsTelecomande, optionTelecomandeSelected)}€`,
                    ],
                  ]
                : []),
              ...(optionMotorisationSelected === "Filaire"
                ? [
                    [
                      "Interrupteur",
                      optionInterrupteurSelected,
                      `${getPrice(optionsInterrupteur, optionInterrupteurSelected)}€`,
                    ],
                    [
                      "Sortie de cable",
                      sortieDeCableSelected,
                      `${getPrice(sortieDeCable, sortieDeCableSelected)}€`,
                    ],
                  ]
                : []),
            ]
          : []),
      ],
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: "left",
        valign: "middle",
        fillColor: [255, 255, 255], // Cell background color
        textColor: [0, 0, 0], // Cell text color
      },
      headStyles: {
        fillColor: [0, 102, 204], // Header background color
        textColor: [255, 255, 255], // Header text color
      },
      columnStyles: {
        2: { halign: "right" }, // Align prices to the right
      },
    });

    // Add total price
    (doc as any).autoTable({
      startY: (doc as any).previousAutoTable.finalY + 10,
      body: [
        ["Total HT", `${totalPrice.toFixed(2)}€`],
        ["Total TTC", `${(totalPrice * 1.2).toFixed(2)}€`],
      ],
      theme: "grid",
      styles: {
        fontSize: 12,
        cellPadding: 4,
        halign: "left",
        fillColor: [220, 220, 220], // Cell background color for total
        textColor: [0, 0, 0], // Cell text color for total
      },
      headStyles: {
        fillColor: [0, 102, 204], // Header background color for total
        textColor: [255, 255, 255], // Header text color for total
      },
      tableWidth: "wrap", // Adjust the table width to fit the content
      margin: { left: 145 }, // Center the table horizontally (assuming page width is 210mm)
    });

    doc.save("Devis.pdf");
  };

  return (
    <button onClick={exportToPDF} className="nav-btn hover:bg-NavbuttonH max-md:text-xs">
      Télécharger mon Devis
    </button>
  );
};

export default PDFExport; // i mean put the first line the Total
