"use client"
import React, {useState} from 'react';
import PersianDatePicker from "@/shared/components/DatePicker/Example";
import PersianDatePicker1 from "@/shared/components/DatePicker/Example1";
import PersianDatePicker2 from "@/shared/components/DatePicker/Example2";

const DatePickerPage = () => {
  const [value, setValue] = useState({year: 1403, month: 0, day: 1});
  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 p-6">
      <PersianDatePicker
        value={value}
        onChange={(val) => setValue(val)}
        minYear={1390}
        maxYear={1410}
      />
      <div className="mt-6 text-sm">Selected: {JSON.stringify(value)}</div>
      <PersianDatePicker1
        value={value}
        onChange={(val) => setValue(val)}
        minYear={1390}
        maxYear={1410}
      />
      <div className="mt-6 text-sm">Selected: {JSON.stringify(value)}</div>
      <PersianDatePicker2
        value={value}
        onChange={(val) => setValue(val)}
        minYear={1360}
        maxYear={1410}
      />
    </div>
  );
}
export default DatePickerPage;
