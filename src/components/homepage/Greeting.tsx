// components/Greeting.tsx
import React from 'react';
import { Session } from 'next-auth';

interface GreetingProps {
  session: Session | null;
}

const Greeting: React.FC<GreetingProps> = ({ session }) => {
  return (
    <div className="flex flex-col mb-10 text-center">
      <h1 className="text-2xl font-bold">
        Bienvenue, {session?.user?.name || "Utilisateur"}!
      </h1>
      <p className="pt-4 text-xl text-gray-600 text-center">
        Choisisez vore produit et cree votre devis !
      </p>
    </div>
  );
};

export default Greeting;
