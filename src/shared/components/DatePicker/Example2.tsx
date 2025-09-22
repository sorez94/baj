import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Picker from "react-scrollable-picker";

type PersianDate = {
  year: number;
  month: number; // 0-11
  day: number;   // 1-31
};

type Props = {
  value?: PersianDate;
  onChange?: (value: PersianDate, gregorianDate: Date) => void;
  minYear?: number; // Jalali
  maxYear?: number; // Jalali
  className?: string;
};

// Enable Jalali calendar in dayjs once
if (!(dayjs as any)._jalalidayEnabled) {
  dayjs.extend(jalaliday);
  (dayjs as any)._jalalidayEnabled = true;
}

const MONTHS_FA = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function toFaDigits(input: string | number) {
  const map: Record<string, string> = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };
  return String(input).replace(/[0-9]/g, (d) => map[d] ?? d);
}

function daysInJMonth(year: number, month: number) {
  return dayjs().calendar("jalali").year(year).month(month).date(1).daysInMonth();
}

function clampDay({ year, month, day }: PersianDate): PersianDate {
  const max = daysInJMonth(year, month);
  return { year, month, day: Math.min(day, max) };
}

function toGregorian({ year, month, day }: PersianDate): Date {
  const d = dayjs()
    .calendar("jalali")
    .year(year)
    .month(month)
    .date(day)
    .calendar("gregory");
  return d.toDate();
}

export default function PersianDatePicker2({
                                            value,
                                            onChange,
                                            minYear = 1320,
                                            maxYear = 1420,
                                            className = "",
                                          }: Props) {
  const todayJ = useMemo(() => {
    const j = dayjs().calendar("jalali");
    return { year: j.year(), month: j.month(), day: j.date() } as PersianDate;
  }, []);

  const [sel, setSel] = useState<PersianDate>(value ? clampDay(value) : todayJ);

  // Keep internal state in sync if parent changes `value`
  useEffect(() => {
    if (value) setSel(clampDay(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.year, value?.month, value?.day]);

  // Emit changes
  useEffect(() => {
    const clamped = clampDay(sel);
    if (clamped.day !== sel.day) {
      setSel(clamped);
      return;
    }
    onChange?.(clamped, toGregorian(clamped));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel.year, sel.month, sel.day]);

  const years = useMemo(() => {
    const start = Math.min(minYear, maxYear);
    const end = Math.max(minYear, maxYear);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [minYear, maxYear]);

  const maxDay = daysInJMonth(sel.year, sel.month);

  return (
    <div
      className={
        "w-full max-w-md mx-auto p-3 rounded-lg border border-gray-200 bg-white " +
        className
      }
      dir="rtl"
    >
      {/* Header */}
      {/*<div className="text-center text-sm text-gray-700 mb-3">*/}
      {/*  {toFaDigits(sel.day)} {MONTHS_FA[sel.month]} {toFaDigits(sel.year)}*/}
      {/*</div>*/}

      {/* Wheels */}
      <div className="grid grid-cols-3 gap-2">
        {/* Day */}
        <div className="p-2 rounded-md border border-gray-200">
          <div className="text-center text-xs text-gray-500 mb-1">روز</div>
          <Picker
            height={160}
            itemHeight={40}
            optionGroups={{
              day: Array.from({ length: maxDay }, (_, i) => ({
                value: String(i + 1),
                label: toFaDigits(i + 1),
              })),
            }}
            valueGroups={{ day: String(sel.day) }}
            onChange={(_: any, val: string) => {
              const d = parseInt(val, 10);
              if (!Number.isNaN(d)) setSel((s) => ({ ...s, day: d }));
            }}
          />
        </div>

        {/* Month */}
        <div className="p-2 rounded-md border border-gray-200">
          <div className="text-center text-xs text-gray-500 mb-1">ماه</div>
          <Picker
            height={160}
            itemHeight={40}
            optionGroups={{
              month: MONTHS_FA.map((m, idx) => ({
                value: String(idx),
                label: m,
              })),
            }}
            valueGroups={{ month: String(sel.month) }}
            onChange={(_: any, val: string) => {
              const m = parseInt(val, 10);
              if (!Number.isNaN(m)) setSel((s) => clampDay({ ...s, month: m }));
            }}
          />
        </div>

        {/* Year */}
        <div className="p-2 rounded-md border border-gray-200">
          <div className="text-center text-xs text-gray-500 mb-1">سال</div>
          <Picker
            height={160}
            itemHeight={40}
            optionGroups={{
              year: years.map((y) => ({
                value: String(y),
                label: toFaDigits(y),
              })),
            }}
            style={{backgroundColor: 'blue'}}
            valueGroups={{ year: String(sel.year) }}
            onChange={(_: any, val: string) => {
              const y = parseInt(val, 10);
              if (!Number.isNaN(y)) setSel((s) => clampDay({ ...s, year: y }));
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-center text-xs text-gray-500">
        Gregorian: {toGregorian(sel).toISOString().slice(0, 10)}
      </div>
    </div>
  );
}
