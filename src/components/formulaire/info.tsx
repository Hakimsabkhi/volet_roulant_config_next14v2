import React, { useState, ChangeEvent, FormEvent } from "react";
import exitIcon from '../../assets/exit.png';
import { InformationProps, FormData } from "../../interfaces";
import Image from 'next/image';


const Information: React.FC<InformationProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    deliveryOption: "",
    fullNameOrCompany: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
    city: "",
    deliveryAddress: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleClose = () => {
    if (onClose) onClose(); // Assuming onClose toggles the visibility of the Information component
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-[1000] transition-opacity duration-300 ease-in-out opacity-100">
    <form className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around z-[1000] w-[40%] h-fit p-[8px] bg-cbutton rounded-[5px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] items-center gap-[20px] max-md:w-[90%]" onSubmit={handleSubmit}>
      <div className="flex justify-end w-full h-[40px]">
        <button type="button" className="close-button" onClick={handleClose}>
        <Image src={exitIcon} loading="eager" alt="Outside View" className="button-close" width={40} height={40}/>
        </button>
      </div>
      <div className="flex flex-col w-[90%] gap-[5px]">
        <label htmlFor="fullNameOrCompany">Nom complet ou Société</label>
        <input
          className="w-full p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
          type="text"
          id="fullNameOrCompany"
          name="fullNameOrCompany"
          value={formData.fullNameOrCompany}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-[90%] gap-[10px] max-md:flex-col">
        <div className="flex flex-col gap-[5px] w-[50%] max-md:w-full">
          <label htmlFor="email">Email</label>
          <input
            className="w-full p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-[5px] w-[50%] max-md:w-full">
          <label htmlFor="phoneNumber">Numéro de téléphone</label>
          <input
            className="w-full p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col w-[90%] gap-[5px]">
        <label htmlFor="deliveryOption">
          Option de livraison
        </label>
        <select
          id="deliveryOption"
          name="deliveryOption"
          value={formData.deliveryOption}
          className="p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
          onChange={handleChange}
        >
          <option value="storePickup">Retrait du magasin</option>
          <option value="homeDelivery">Livraison à domicile</option>
        </select>
      </div>
      {formData.deliveryOption === "homeDelivery" && (
        <>
          <div className="w-[90%] flex flex-col gap-[5px]">
            <label htmlFor="deliveryAddress">Adresse de livraison</label>
            <input
              className="w-full p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
            />
          </div>
          <div className="w-[90%] flex gap-[10px]">
            <div className="flex flex-col gap-[5px]  w-[50%]">
              <label htmlFor="city">Ville</label>
              <input
                className="w-full p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-[5px]  w-[50%]">
              <label htmlFor="postalCode">Code Postal</label>
              <input
                className="w-full p-[8px] border text-[#000] border-[#ccc] rounded-[4px] box-border transition-[border-color] duration-300 ease"
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}
      <div className="w-fit">
        <button type="submit" className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-2">
          Envoyer
        </button>
      </div>
    </form>
    </div>
  );
};

export default Information;
