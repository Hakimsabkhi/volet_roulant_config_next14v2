import { useState } from 'react';

interface Address {
  _id: string;
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
  const [street, setStreet] = useState(existingData?.street || '');
  const [postalCode, setPostalCode] = useState(existingData?.postalCode || '');
  const [city, setCity] = useState(existingData?.city || '');
  const [country, setCountry] = useState(existingData?.country || '');
  const [additionalInfo, setAdditionalInfo] = useState(existingData?.additionalInfo || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const addressData: Omit<Address, '_id'> & { _id?: string } = {
      street,
      postalCode,
      city,
      country,
      additionalInfo,
      _id: existingData?._id,
    };

    const response = await fetch('/api/adresse/save', {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Street:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Postal Code:</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Additional Info:</label>
        <input
          type="text"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {existingData ? 'Update Address' : 'Add Address'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdresseForm;
