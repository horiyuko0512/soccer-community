"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import Link from "next/link"

const RegisterPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="bg-sky-500 p-4 text-white mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">新規登録</h1>
          <Button variant="outline" className="bg-white hover:bg-sky-100 text-black"
            onClick={() => router.push('/top')}>
            戻る
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">アカウント情報入力</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="8文字以上で入力してください"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="もう一度入力してください"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">ニックネーム</Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="サッカー好き太郎"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile">自己紹介（任意）</Label>
                <Textarea
                  id="profile"
                  placeholder="サッカー歴や好きなポジションなど"
                  className="h-24"
                />
              </div>

              <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                登録する
              </Button>

              <div className="text-center text-sm text-sky-600">
                すでにアカウントをお持ちの方は
                <Link href="/login" className="text-sky-700 hover:underline ml-1">
                  ログイン
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;