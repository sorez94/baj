'use client';

import React, {useState} from 'react';
import {useTheme} from '@/shared/theme/useTheme';
import {AlertCircle, ChevronDown} from 'lucide-react';
import styles from './SelectDemo.module.scss';

import {MenuItem, Select} from '@/shared/components';

export const SelectDemo = () => {
  const {isDark, toggle} = useTheme();
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (value: any) => {
    console.log('Selected:', value);
    setSelectedValue(value);
  };

  return (
    <div className={styles.container} dir="rtl">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>کامپوننت انتخاب</h1>
          <p className={styles.subtitle}>
            سیستم کامل انتخاب با Material UI و پشتیبانی کامل از RTL
          </p>
          <button
            onClick={toggle}
            className={styles.themeToggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Select Demo */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>کامپوننت انتخاب</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>انتخاب</label>
              <Select
                label="انتخاب یک گزینه"
                value={selectedValue}
                onChange={handleSelectChange}
                leftIcon={ChevronDown}
                fullWidth
                isRTL={true}
              >
                <MenuItem value="option1">گزینه ۱</MenuItem>
                <MenuItem value="option2">گزینه ۲</MenuItem>
                <MenuItem value="option3">گزینه ۳</MenuItem>
              </Select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Disabled</label>
              <Select
                label="انتخاب یک گزینه"
                value={selectedValue}
                onChange={handleSelectChange}
                leftIcon={AlertCircle}
                state="error"
                fullWidth
                isRTL={true}
              >
                <MenuItem value="option1">گزینه ۱</MenuItem>
                <MenuItem value="option2">گزینه ۲</MenuItem>
                <MenuItem value="option3">گزینه ۳</MenuItem>
              </Select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>انتخاب با وضعیت خطا</label>
              <Select
                label="انتخاب یک گزینه"
                value={selectedValue}
                onChange={handleSelectChange}
                leftIcon={AlertCircle}
                fullWidth
                disabled
                isRTL={true}
              >
                <MenuItem value="option1">گزینه ۱</MenuItem>
                <MenuItem value="option2">گزینه ۲</MenuItem>
                <MenuItem value="option3">گزینه ۳</MenuItem>
              </Select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
