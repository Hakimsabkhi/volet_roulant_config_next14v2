import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust the import path to where your authOptions are defined

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex gap-4 justify-between w-[90%]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <h1>Bienvenue, {session?.user?.name || "Utilisateur"}!</h1>
          <p>Ceci est votre page d&apos;accueil.</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
