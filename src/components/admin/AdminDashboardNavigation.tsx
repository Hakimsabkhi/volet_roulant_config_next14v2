// src/app/AdminDashboardNavigation.tsx

"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AdminDashboardNavigation: React.FC = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <section
        className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
        onClick={() => navigateTo("/admin/dashboard/users")}
      >
        <h2 className="text-lg font-semibold mb-4">Users</h2>
      </section>

      <section
        className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
        onClick={() => navigateTo("/admin/dashboard/devis-a-approuver")}
      >
        <h2 className="text-lg font-semibold mb-4">Devis à Approuver</h2>
      </section>

      <section
        className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
        onClick={() => navigateTo("/admin/dashboard/devis-en-cours")}
      >
        <h2 className="text-lg font-semibold mb-4">Devis en Cours de Traitement</h2>
      </section>

      <section
        className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
        onClick={() => navigateTo("/admin/dashboard/devis-paye")}
      >
        <h2 className="text-lg font-semibold mb-4">Devis Payé</h2>
      </section>
    </div>
  );
};

export default AdminDashboardNavigation;
