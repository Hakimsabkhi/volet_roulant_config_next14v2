import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed h-full w-60 bg-secondary text-white flex flex-col">
      <div className="p-6 text-2xl mt-10 font-bold uppercase">
        Mes devis
      </div>
      <hr className="w-2/3 ml-6 border-t-2 border-gray-300" />
      <nav className="flex-grow">
        <ul className=" py-4">
        <li>
            <a href="/" className="block pl-6 p-2 hover:bg-white hover:text-black">
            Page d&apos;accueil
            </a>
          </li>
          <li>
            <a href="/deviscrees" className="block pl-6 p-2 hover:bg-white hover:text-black">
              Devis créés
            </a>
          </li>
          <li>
            <a href="/devisapprouves" className="block pl-6 p-2 hover:bg-white hover:text-black">
              Devis approuvés
            </a>
          </li>
          <li>
            <a href="#" className="block pl-6 p-2 hover:bg-white hover:text-black">
              Adresse
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
