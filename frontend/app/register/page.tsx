"use client";

import React from 'react';
import RegisterForm from './RegisterForm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <div className="bg-sky-500 p-4 text-white mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">新規登録</h1>
          <Button
            variant="outline"
            className="bg-white hover:bg-sky-100 text-black"
            onClick={() => router.push("/top")}
          >
            戻る
          </Button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="container max-w-md px-4 pb-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;