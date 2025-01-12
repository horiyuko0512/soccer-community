"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

const CreatePage = () => {
  const router = useRouter();
  const [level, setLevel] = useState('');
  return (
    <div className="min-h-screen bg-sky-50 pb-20">
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

      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">試合情報入力</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  placeholder="例：エンジョイフットサル"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">開催日</Label>
                <Input
                  id="date"
                  type="date"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">開始時間</Label>
                  <Input
                    id="startTime"
                    type="time"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">終了時間</Label>
                  <Input
                    id="endTime"
                    type="time"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">場所</Label>
                <Input
                  id="location"
                  placeholder="例：渋谷区スポーツセンター"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">レベル</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'beginner', label: '初級' },
                    { id: 'intermediate', label: '中級' },
                    { id: 'advanced', label: '上級' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLevel(item.id)}
                      className={`
                        px-4 py-2 rounded-md text-sm border
                        transition-all duration-200
                        ${level === item.id
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="capacity">募集人数</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="例：4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">参加費</Label>
                <Input
                  id="fee"
                  type="number"
                  min="0"
                  placeholder="例：1000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">備考</Label>
                <Textarea
                  id="description"
                  placeholder="持ち物や注意事項など"
                  className="h-24"
                />
              </div>

              <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                試合を作成する
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePage;