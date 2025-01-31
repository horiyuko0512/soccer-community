import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 開始日時と終了日時を日本語形式で出力するユーティリティ関数
 * @param startAt - 開始日時 (ISO 8601形式の文字列)
 * @param endAt - 終了日時 (ISO 8601形式の文字列)
 * @returns {string} - `yyyy年MM月dd日 HH:mm~HH:mm`形式の文字列
 */
export const formatEventDuration = (startAt: string, endAt: string): string => {
  try {
    const jstStartAt = toZonedTime(new Date(startAt), "Asia/Tokyo")
    const jstEndAt = toZonedTime(new Date(endAt), "Asia/Tokyo")
    const datePart = format(jstStartAt, "yyyy年MM月dd日")
    const startTimePart = format(jstStartAt, "HH:mm")
    const endTimePart = format(jstEndAt, "HH:mm")
    return `${datePart} ${startTimePart}~${endTimePart}`
  } catch (error) {
    console.error("日付フォーマットエラー:", error)
    return "不明な日時"
  }
}

/**
 * 日付と時間をISO 8601形式 (YYYY-MM-DDTHH:mm:ssZ) に変換するユーティリティ関数
 * @param date - `YYYY-MM-DD` の形式の文字列
 * @param time - `HH:mm` の形式の文字列
 * @returns ISO 8601形式の文字列
 */
export const formatDateTimeToISO = (date: string, time: string): string => {
  return dayjs(`${date}T${time}`).toISOString()
}
