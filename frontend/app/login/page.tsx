"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <div className="bg-sky-500 p-4 text-white mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ログイン</h1>
          <Button variant="outline" className="bg-white hover:bg-sky-100 text-black"
            onClick={() => router.push('/top')}>
            戻る
          </Button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="container max-w-md px-4 pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-sky-900">アカウントにログイン</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="パスワードを入力"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                  ログイン
                </Button>
                <div className="space-y-4 text-center">
                  <div className="text-sm text-sky-600">
                    アカウントをお持ちでない方は
                    <Link href="/register" className="text-sky-700 hover:underline ml-1">
                      新規登録
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
