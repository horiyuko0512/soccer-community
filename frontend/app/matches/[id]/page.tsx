"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const MatchPage = () => {
  const router = useRouter();
  return (
    <>
      <Header/>
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900">試合詳細</h1>
        <Button
          className="bg-sky-500 hover:bg-sky-600 text-white"
          onClick={() => router.back()}
        >
          戻る
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">エンジョイフットサル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">日時</h3>
                <p>2024年12月31日 15:00～17:00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">場所</h3>
                <p>渋谷区スポーツセンター</p>
                <p className="text-sm text-gray-600">東京都渋谷区神南1-1-1</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">レベル</h3>
                <p>初級～中級</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">募集人数</h3>
                <p>4人</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">参加費</h3>
                <p>1,000円</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-sky-700 mb-1">備考</h3>
                <p>初心者歓迎です！楽しくサッカーしましょう！</p>
              </div>
              <Button className="w-full bg-sky-500 hover:bg-sky-600">
              この試合に応募する
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
};

export default MatchPage;