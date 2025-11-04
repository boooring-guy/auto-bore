import { AppHeader } from "@/modules/dashboard/components/AppHeader";
import React from "react";

type ManageLayoutProps = {
  children: React.ReactNode;
};

const ManageLayout = ({ children }: ManageLayoutProps) => {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
      {children}
    </>
  );
};

export default ManageLayout;
