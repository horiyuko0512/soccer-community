"use client";

import React from "react";
import CreateForm from "./CreateForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const CreatePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <Header/>
        <div className="flex justify-between items-center mb-4 mt-6 px-4">
          <h1 className="text-2xl font-bold text-gray-900">試合作成</h1>
          <Button
          className="bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <CreateForm />
      </div>
    </div>
  );
};

export default CreatePage;