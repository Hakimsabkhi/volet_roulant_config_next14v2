// components/CreateDevisButton.tsx
"use client";
import React from "react";
import Image from "next/image";
import { ConfigIconIcon } from "../assets/imageModule";
import Link from "next/link";

const CreateDevisButton: React.FC = () => {
  return (
    <Link href="/configurateur">
      <button className="w-fit text-[#fff] hover:text-[#44326E] gap-2 font-bold h-[50px] px-2 bg-none border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-[4px] transition-shadow duration-300 ease z-[1000] hover:bg-cwhite">
        <Image
          src={ConfigIconIcon}
          alt="Config Icon"
          className="button-icon"
          width={40}
          height={40}
        />
        <p>Créer un devis</p>
      </button>
    </Link>
  );
};

export default CreateDevisButton;
