"use client";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { SignOutButton } from "@/modules/auth";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());
  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());
  const { mutate: createWorkflow } = useMutation(
    trpc.createWorkflow.mutationOptions()
  );
  const handleCreateWorkflow = () => {
    toast.loading("Workflow creation started...");
    createWorkflow(
      {
        name: `Workflow ${generateId("workflows", 8)}`,
        description: "Test Description",
      },
      {
        onSuccess: () => {
          // PRBLEM: will not know when the workflow is completed
          toast.success("Workflow creation completed successfully");
          toast.dismiss();
        },  
        onError: () => {
          toast.error("Failed to create workflow");
          toast.dismiss();
        },
      }
    );
  };
  console.log(workflows, "workflows");
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <pre>{JSON.stringify(workflows, null, 2)}</pre>
      <SignOutButton
        showIcon
        callbackURL="/login"
        onSignOutSuccess={() => {
          toast.success("Signed out successfully");
        }}
      >
        Sign Out
      </SignOutButton>
      <Button variant={"ghost"} onClick={handleCreateWorkflow}>
        Create Workflow
      </Button>
    </div>
  );
}
