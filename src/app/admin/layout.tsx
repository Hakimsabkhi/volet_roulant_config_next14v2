// src/app/admin/layout.tsx
import React, { ReactNode } from "react";
import AdminDashboardNavigation from "@/components/admin/AdminDashboardNavigation"; // Import the new component

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <AdminDashboardNavigation /> {/* Include the new component here */}
      <main className="h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
