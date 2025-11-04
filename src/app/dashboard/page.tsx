"use client";
import { SignOutButton } from "@/modules/auth";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <SignOutButton
        showIcon
        callbackURL="/login"
        onSignOutSuccess={() => {
          toast.success("Signed out successfully");
        }}
      >
        Sign Out
      </SignOutButton>
    </div>
  );
}
