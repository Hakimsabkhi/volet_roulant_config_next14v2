// src/app/AdminDashboardNavigation.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";

const AdminDashboardNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Define the navigation items
  const navigationItems = [
    {
      label: 'Users',
      path: '/admin/dashboard/users',
    },
    {
      label: 'Devis à Approuver',
      path: '/admin/dashboard/devis-a-approuver',
    },
    {
      label: 'Devis en Cours de Traitement',
      path: '/admin/dashboard/devis-en-cours',
    },
    {
      label: 'Devis Payé',
      path: '/admin/dashboard/devis-paye',
    },
  ];

  // State to keep track of the selected path
  const [selectedPath, setSelectedPath] = useState<string>(pathname);

  useEffect(() => {
    // Update selectedPath when the route changes
    setSelectedPath(pathname);
  }, [pathname]);

  const navigateTo = (path: string) => {
    router.push(path);
    setSelectedPath(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {navigationItems.map((item) => (
        <section
          key={item.path}
          onClick={() => navigateTo(item.path)}
          className={`p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
            selectedPath === item.path
              ? 'bg-secondary text-white'
              : 'bg-gray-100 hover:bg-blue-100'
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">{item.label}</h2>
        </section>
      ))}
    </div>
  );
};

export default AdminDashboardNavigation;
