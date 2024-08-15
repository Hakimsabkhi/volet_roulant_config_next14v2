"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex gap-4 justify-between w-[90%]">
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-col">
          <h1>Bienvenue, {session?.user?.name || "Utilisateur"}!</h1>
          <p>Ceci est votre page d&apos;accueil.</p>
        </div>
      </div>
    </main>
  );
};

export default Home;