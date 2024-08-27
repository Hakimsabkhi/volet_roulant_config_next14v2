"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";

const UserSection: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Dropdown
      userName={session?.user?.name as string}
      userEmail={session?.user?.email as string}
      userRole={session?.user?.role as string}
    />
  );
};

export default UserSection;
