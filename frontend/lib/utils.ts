import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * UTCの日時を日本時間に変換し、指定のフォーマットで出力する
 * @param {string} utcDate - UTCの日時文字列
 * @returns {string} - 日本時間でのフォーマット済み日時
 */
export const formatToJapaneseDateTime = (utcDate: Date) => {
  try {
    const jstDate = toZonedTime(utcDate, "Asia/Tokyo");
    return format(jstDate, "yyyy年MM月dd日 HH:mm");
  } catch (error) {
    console.error("日付フォーマットエラー:", error);
    return "不明な日時";
  }
};

/**
 * 日付をISO 8601形式 (YYYY-MM-DDTHH:mm:ssZ) に変換するユーティリティ関数
 * @param date - `YYYY-MM-DD` の形式の文字列
 * @returns ISO 8601形式の文字列
 */
export const formatDateToISO = (date: string): string => {
  return dayjs(date).toISOString();
};