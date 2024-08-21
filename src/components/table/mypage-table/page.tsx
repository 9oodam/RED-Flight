"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useActiveAccount } from "thirdweb/react";

import { usePrompts, useSelectPrompt } from "@/hooks/prompt/useSelectPrompt";

export default function PromptPageTable() {
  const prompts = usePrompts();
  const activeAccount = useActiveAccount();
  const { status } = useSelectPrompt();

  console.log("prompts", prompts);

  if (!activeAccount) {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          My Red Prompts
        </h2>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Loading...
        </h2>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-between space-y-2 p-8">
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Error
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-red-600">
            My Red Prompts
          </h2>
        </div>
        <DataTable data={prompts} columns={columns} />
      </div>
    </>
  );
}