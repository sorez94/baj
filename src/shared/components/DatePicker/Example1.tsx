import React, {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import {ChevronUp, ChevronDown} from "lucide-react";
import {Typography} from "@/shared/components";
import { motion, AnimatePresence } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Picker from 'react-scrollable-picker';

// Enable Jalali calendar in dayjs
if (!(dayjs as any)._jalalidayEnabled) {
  dayjs.extend(jalaliday);
  (dayjs as any)._jalalidayEnabled = true;
}

type PersianDate = {
  year: number;
  month: number;
  day: number;
};

type Props = {
  value?: PersianDate;
  onChange?: (value: PersianDate, gregorianDate: Date) => void;
  minYear?: number;
  maxYear?: number;
  className?: string;
};

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

function clampDay({year, month, day}: PersianDate): PersianDate {
  const max = daysInJMonth(year, month);
  return {year, month, day: Math.min(day, max)};
}

function toGregorian({year, month, day}: PersianDate): Date {
  const d = dayjs()
    .calendar("jalali")
    .year(year)
    .month(month)
    .date(day)
    .calendar("gregory");
  return d.toDate();
}

export default function PersianDatePicker1({
                                            value,
                                            onChange,
                                            minYear = 1000,
                                            maxYear = 1450,
                                            className = "",
                                          }: Props) {
  const todayJ = useMemo(() => {
    const j = dayjs().calendar("jalali");
    return {
      year: j.year(),
      month: j.month(),
      day: j.date(),
    } as PersianDate;
  }, []);

  const [sel, setSel] = useState<PersianDate>(value ? clampDay(value) : todayJ);

  useEffect(() => {
    if (value) setSel(clampDay(value));
  }, [value?.year, value?.month, value?.day]);

  useEffect(() => {
    const clamped = clampDay(sel);
    if (clamped.day !== sel.day) setSel(clamped);
    const g = toGregorian(clamped);
    onChange?.(clamped, g);
  }, [sel.year, sel.month, sel.day]);

  const years = useMemo(() => {
    const arr: number[] = Array.from({ length: 1420 - 1320 + 1 }, (_, i) => 1320 + i);
    console.log(arr)
    return arr;
  }, [minYear, maxYear]);

  function bumpDay(delta: 1 | -1) {
    setSel((s) => {
      const max = daysInJMonth(s.year, s.month);
      let next = s.day + delta;
      if (next > max) next = 1;
      if (next < 1) next = max;
      return {...s, day: next};
    });
  }

  function bumpMonth(delta: 1 | -1) {
    setSel((s) => {
      let m = s.month + delta;
      let y = s.year;
      if (m > 11) {
        m = 0;
        y = Math.min(y + 1, years[years.length - 1]);
      } else if (m < 0) {
        m = 11;
        y = Math.max(y - 1, years[0]);
      }
      const maxD = daysInJMonth(y, m);
      const d = Math.min(s.day, maxD);
      return {year: y, month: m, day: d};
    });
  }

  function bumpYear(delta: 1 | -1) {
    setSel((s) => {
      let y = s.year + delta;
      if (y > years[years.length - 1]) y = years[0];
      if (y < years[0]) y = years[years.length - 1];
      const maxD = daysInJMonth(y, s.month);
      const d = Math.min(s.day, maxD);
      return {...s, year: y, day: d};
    });
  }

  function Wheel({
                   label,
                   onUp,
                   onDown,
                   center,
                   above,
                   below,
                   centerKey,
                 }: {
    label: string;
    onUp: () => void;
    onDown: () => void;
    center: string;
    above: string;
    below: string;
    centerKey: string | number; // unique key for animation
  }) {
    const [dir, setDir] = useState<"up" | "down">("up");
    const cooldownRef = React.useRef(false);
    const wheelTimeoutRef = React.useRef<number | null>(null);

    const handleUp = () => {
      setDir("up");
      onUp();
    };
    const handleDown = () => {
      setDir("down");
      onDown();
    };

    // Prevent rapid firing from wheel
    const withCooldown = (cb: () => void) => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      cb();
      window.setTimeout(() => (cooldownRef.current = false), 140);
    };

    const onWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      if (Math.abs(delta) < 2) return;
      withCooldown(() => (delta > 0 ? handleDown() : handleUp()));
    };

    // motion variants depending on direction
    const shift = dir === "up" ? 24 : -24;

    return (
      <div className="flex flex-col items-stretch w-full select-none">
        <button
          className="mx-auto h-9 w-9 rounded-full hover:shadow active:scale-95 transition grid place-items-center"
          onClick={handleUp}
          aria-label={`${label} up`}
          type="button"
        >
          <ChevronUp className="w-5 h-5"/>
        </button>

        <div className="relative h-40 mt-1 overflow-hidden" onWheel={onWheel}>
          {/* highlight window */}
          <div
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 rounded-xl border-2 border-blue-500 bg-blue-100/50 backdrop-blur-sm"/>

          {/* items */}
          <div className="flex flex-col items-center gap-1 text-center pt-4">
            <div className="text-sm text-gray-400 h-8 flex items-center">
              <Typography variant='bodyMedium'> {above} </Typography>
            </div>

            {/* Drag to change (touch/mouse) */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y <= -18) handleUp();
                else if (info.offset.y >= 18) handleDown();
              }}
              className="h-10 flex items-center justify-center w-full"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={String(centerKey)}
                  initial={{ y: shift, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -shift, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="h-10 flex items-center justify-center w-4/5"
                >
                  <div style={{ width:'100%', backgroundColor:'var(--color-primary)', borderRadius: '7px', padding: '5px 5px'}} className="text-xl font-semibold text-white">
                    <Typography sx={{color: 'white'}} variant='bodyMedium'>{center}</Typography>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="text-sm text-gray-400 h-8 flex items-center">
              <Typography variant='bodyMedium'>{below}</Typography>
            </div>
          </div>
        </div>

        <button
          className="mx-auto h-9 w-9 rounded-full hover:shadow active:scale-95 transition grid place-items-center"
          onClick={handleDown}
          aria-label={`${label} down`}
          type="button"
        >
          <ChevronDown className="w-5 h-5"/>
        </button>
      </div>
    );
  }

  const maxDay = daysInJMonth(sel.year, sel.month);
  const prevDay = sel.day - 1 < 1 ? maxDay : sel.day - 1;
  const nextDay = sel.day + 1 > maxDay ? 1 : sel.day + 1;

  const prevMonthIdx = sel.month - 1 < 0 ? 11 : sel.month - 1;
  const nextMonthIdx = sel.month + 1 > 11 ? 0 : sel.month + 1;

  const yIdx = years.indexOf(sel.year);
  const prevYear = years[(yIdx - 1 + years.length) % years.length];
  const nextYear = years[(yIdx + 1) % years.length];

  return (
    <div
      className={
        "w-full max-w-md mx-auto bg-white/70 backdrop-blur p-4 rounded-2xl shadow-sm border border-black/5 " +
        className
      }
      dir="rtl"
    >
      <div className="mb-3 text-center text-sm text-gray-600">
        تاریخ انتخاب‌شده: {toFaDigits(sel.day)} {MONTHS_FA[sel.month]} {toFaDigits(sel.year)}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Day */}
        <div className="rounded-2xl p-2 bg-gradient-to-b from-gray-50 to-white border border-black/5">
          <div className="text-center text-xs text-gray-500 mb-1">روز</div>
          {/* Arrows */}
          <div className="flex justify-center gap-4 mb-2">
            <button className="h-8 w-8 rounded-full hover:shadow active:scale-95 grid place-items-center" onClick={() => bumpDay(1)}>
              <ChevronUp className="w-4 h-4" />
            </button>
            <button className="h-8 w-8 rounded-full hover:shadow active:scale-95 grid place-items-center" onClick={() => bumpDay(-1)}>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2 right-2 h-10 rounded-xl border-2 border-blue-500/70 bg-blue-100/40" />
            <Picker
              height={160}
              itemHeight={40}
              optionGroups={{ day: Array.from({length: maxDay}, (_,i)=> ({ value: String(i+1), label: toFaDigits(i+1) })) }}
              valueGroups={{ day: String(sel.day) }}
              onChange={(name: any, val: any) => {
                const d = parseInt(val, 10);
                if (!Number.isNaN(d)) setSel(s=> ({...s, day: d }));
              }}
            />
          </div>
        </div>

        {/* Month */}
        <div className="rounded-2xl p-2 bg-gradient-to-b from-gray-50 to-white border border-black/5">
          <div className="text-center text-xs text-gray-500 mb-1">ماه</div>
          <div className="flex justify-center gap-4 mb-2">
            <button className="h-8 w-8 rounded-full hover:shadow active:scale-95 grid place-items-center" onClick={() => bumpMonth(1)}>
              <ChevronUp className="w-4 h-4" />
            </button>
            <button className="h-8 w-8 rounded-full hover:shadow active:scale-95 grid place-items-center" onClick={() => bumpMonth(-1)}>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2 right-2 h-10 rounded-xl border-2 border-blue-500/70 bg-blue-100/40" />
            <Picker
              height={160}
              itemHeight={40}
              optionGroups={{ month: MONTHS_FA.map((m,idx)=> ({ value: String(idx), label: m })) }}
              valueGroups={{ month: String(sel.month) }}
              onChange={(name: any, val: any) => {
                const m = parseInt(val, 10);
                if (!Number.isNaN(m)) setSel(s=> ({...s, month: m }));
              }}
            />
          </div>
        </div>

        {/* Year */}
        <div className="rounded-2xl p-2 bg-gradient-to-b from-gray-50 to-white border border-black/5">
          <div className="text-center text-xs text-gray-500 mb-1">سال</div>
          <div className="flex justify-center gap-4 mb-2">
            <button className="h-8 w-8 rounded-full hover:shadow active:scale-95 grid place-items-center" onClick={() => bumpYear(1)}>
              <ChevronUp className="w-4 h-4" />
            </button>
            <button className="h-8 w-8 rounded-full hover:shadow active:scale-95 grid place-items-center" onClick={() => bumpYear(-1)}>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2 right-2 h-10 rounded-xl border-2 border-blue-500/70 bg-blue-100/40" />
            <Picker
              height={160}
              itemHeight={40}
              optionGroups={{ year: years.map(y=> ({ value: String(y), label: toFaDigits(y) })) }}
              valueGroups={{ year: String(sel.year) }}
              onChange={(name: any, val: any) => {
                const y = parseInt(val, 10);
                if (!Number.isNaN(y)) setSel(s=> clampDay({...s, year: y }));
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Gregorian: {toGregorian(sel).toISOString().slice(0, 10)}
      </div>
    </div>
  );
}
