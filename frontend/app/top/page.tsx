import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="bg-sky-500 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">SoccerCommunity</span>
          <Button variant="outline" className="bg-white hover:bg-sky-100 text-black">
            ログイン
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sky-900 mb-4">
            近所でサッカーを楽しもう！
          </h1>
          <p className="text-lg text-sky-700 mb-6">
            地域のサッカー仲間とつながり、一緒に試合を楽しみましょう
          </p>
          <Button className="w-full md:w-auto bg-sky-500 hover:bg-sky-600 text-lg px-8 py-4 mb-8">
            新規登録して始める
          </Button>
        </div>

        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          <Card className="p-4">
            <CardContent>
              <h3 className="text-lg font-bold text-sky-800 mb-3">簡単マッチング</h3>
              <p className="text-sky-600">
                お近くのサッカー仲間とすぐに試合の約束ができます
              </p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <h3 className="text-lg font-bold text-sky-800 mb-3">メンバー募集</h3>
              <p className="text-sky-600">
                チームメンバーを募集して、一緒にプレーする仲間を見つけましょう
              </p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <h3 className="text-lg font-bold text-sky-800 mb-3">場所共有</h3>
              <p className="text-sky-600">
                試合場所の共有も簡単。集合場所に迷うことはありません
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;