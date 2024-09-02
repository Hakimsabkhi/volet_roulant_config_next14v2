import { useState } from 'react';

interface Address {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  additionalInfo?: string;
}

interface AdresseFormProps {
  existingData?: Address | null;
  onClose: () => void;
  onSave: (address: Address) => void;
}

const AdresseForm: React.FC<AdresseFormProps> = ({ existingData, onClose, onSave }) => {
  const [name, setName] = useState(existingData?.name || '');
  const [surname, setSurname] = useState(existingData?.surname || '');
  const [phoneNumber, setPhoneNumber] = useState(existingData?.phoneNumber || '');
  const [street, setStreet] = useState(existingData?.street || '');
  const [postalCode, setPostalCode] = useState(existingData?.postalCode || '');
  const [city, setCity] = useState(existingData?.city || '');
  const [country, setCountry] = useState(existingData?.country || '');
  const [additionalInfo, setAdditionalInfo] = useState(existingData?.additionalInfo || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const addressData: Omit<Address, '_id'> & { _id?: string } = {
      name,
      surname,
      phoneNumber,
      street,
      postalCode,
      city,
      country,
      additionalInfo,
      _id: existingData?._id,
    };

    const response = await fetch(`/api/adresse/save`, {
      method: existingData ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    if (response.ok) {
      const savedAddress = await response.json();
      onSave(savedAddress);
    } else {
      console.error('Failed to save address');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] space-y-4">
      <div>
        <label className="block font-medium">Prénom:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Nom:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Numéro de téléphone:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Rue:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Code postal:</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Ville:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Pays:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Informations supplémentaires:</label>
        <input
          type="text"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="nav-btn hover:bg-NavbuttonH uppercase font-bold"
        >
          {existingData ? 'Mettre à jour l’adresse' : 'Ajouter l’adresse'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="nav-btn hover:bg-NavbuttonH uppercase font-bold"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default AdresseForm;
