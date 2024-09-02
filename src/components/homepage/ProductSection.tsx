"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { rideauMetaliqueIMG, voletRoulantsIMG, storeBanneIMG, porteGarageIMG } from "@/assets/imageModule";

const ProductSection: React.FC = () => {
  const [bannerOpen, setBannerOpen] = useState(true);

  const accordionData = [
    {
      id: 1,
      text: "Créer devis volet roulant",
      imageUrl: voletRoulantsIMG,
      altText: "Image 01",
    },
    {
      id: 2,
      text: "Créer devis rideau metallique",
      imageUrl: rideauMetaliqueIMG,
      altText: "Image 02",
    },
    {
      id: 3,
      text: "Créer devis store Banne",
      imageUrl: storeBanneIMG,
      altText: "Image 03",
    },
    {
      id: 4,
      text: "Créer devis store Banne",
      imageUrl: porteGarageIMG,
      altText: "Image 03",
    },
  ];

  return (
    <div className="relative">
      <main className="relative flex flex-col justify-center bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          {/* Image accordion component */}
          <div className="group flex max-md:flex-col justify-center gap-2">
            {accordionData.map((item) => (
              <article
                key={item.id}
                className="group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:transition-all focus-within:ring focus-within:ring-indigo-300"
              >
                <a className="absolute inset-0 text-white z-10" href="#0">
                  <span className="absolute inset-x-0 bottom-0 text-2xl uppercase tracking-widest font-bold p-6 md:px-12 md:py-8 md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
                    {item.text}
                  </span>
                </a>
                <Image
                  className="object-cover h-72 md:h-[580px] md:w-auto"
                  src={item.imageUrl}
                  width={960}
                  height={680}
                  alt={item.altText}
                />
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductSection;