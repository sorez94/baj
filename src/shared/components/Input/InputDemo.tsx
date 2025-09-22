'use client';

import React, { useState } from 'react';
import { Input } from './Input';
import { useTheme } from '@/shared/theme/useTheme';
import { 
  Mail, 
  Lock, 
  Search, 
  User, 
  Phone, 
  Globe, 
  Eye, 
  EyeOff,
  Send,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import styles from './InputDemo.module.scss';

export const InputDemo = () => {
  const { isDark, toggle } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [urlValue, setUrlValue] = useState('');

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const handleEmailSubmit = () => {
    console.log('Email submitted:', emailValue);
  };

  

  return (
    <div className={styles.container} dir="rtl">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>کامپوننت ورودی</h1>
          <p className={styles.subtitle}>
            سیستم کامل ورودی با Material UI و پشتیبانی کامل از RTL
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
        {/* Basic Inputs */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ورودی‌های پایه</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی متنی ساده</label>
              <Input
                placeholder="متن خود را وارد کنید..."
                fullWidth
                label="ورودی متنی ساده"
                onChange={setNameValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی با آیکون</label>
              <Input
                placeholder="جستجو..."
                leftIcon={Search}
                variant='filled'
                label='جستجو'
                fullWidth
                isRTL={true}
                onChange={setSearchValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی با آیکون قابل کلیک</label>
              <Input
                placeholder="ایمیل خود را وارد کنید..."
                leftIcon={Mail}
                rightIcon={Send}
                rightIconClick={handleEmailSubmit}
                fullWidth
                isRTL={true}
                onChange={setEmailValue}
              />
            </div>
          </div>
        </section>

        {/* Input Variants */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>انواع ورودی</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Outlined (پیش‌فرض)</label>
              <Input
                placeholder="ورودی outlined..."
                variant="outlined"
                fullWidth
                isRTL={true}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Filled</label>
              <Input
                placeholder="ورودی filled..."
                label="ورودی filled"
                variant="filled"
                fullWidth
                isRTL={true}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Standard</label>
              <Input
                placeholder="ورودی standard..."
                variant="standard"
                fullWidth
                isRTL={true}
              />
            </div>
          </div>
        </section>

        {/* Input Types */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>انواع ورودی</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ایمیل</label>
              <Input
                type="email"
                placeholder="example@email.com"
                leftIcon={Mail}
                fullWidth
                isRTL={true}
                value={emailValue}
                onChange={setEmailValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>رمز عبور</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="رمز عبور خود را وارد کنید..."
                leftIcon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                rightIconClick={handlePasswordToggle}
                fullWidth
                isRTL={true}
                value={passwordValue}
                onChange={setPasswordValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>شماره تلفن</label>
              <Input
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                leftIcon={Phone}
                fullWidth
                isRTL={true}
                value={phoneValue}
                onChange={setPhoneValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>آدرس وب</label>
              <Input
                type="url"
                placeholder="https://example.com"
                leftIcon={Globe}
                fullWidth
                isRTL={true}
                value={urlValue}
                onChange={setUrlValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>جستجو</label>
              <Input
                type="search"
                placeholder="جستجو کنید..."
                leftIcon={Search}
                rightIcon={Send}
                rightIconClick={handleSearch}
                fullWidth
                isRTL={true}
                value={searchValue}
                onChange={setSearchValue}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>شماره</label>
              <Input
                type="number"
                placeholder="عدد مورد نظر را وارد کنید..."
                leftIcon={CreditCard}
                fullWidth
                isRTL={true}
              />
            </div>
          </div>
        </section>

        {/* Input States */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>حالت‌های ورودی</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>پیش‌فرض - Outlined</label>
              <Input
                placeholder="حالت پیش‌فرض..."
                variant="outlined"
                fullWidth
                isRTL={true}
                helperText="این یک متن راهنمای ساده است"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>پیش‌فرض - Filled</label>
              <Input
                placeholder="حالت پیش‌فرض..."
                variant="filled"
                fullWidth
                isRTL={true}
                helperText="این یک متن راهنمای ساده است"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>پیش‌فرض - Standard</label>
              <Input
                placeholder="حالت پیش‌فرض..."
                variant="standard"
                fullWidth
                isRTL={true}
                helperText="این یک متن راهنمای ساده است"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>خطا - Outlined</label>
              <Input
                placeholder="حالت خطا..."
                variant="outlined"
                fullWidth
                isRTL={true}
                errorText="این فیلد اجباری است و باید پر شود"
                leftIcon={AlertCircle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>خطا - Filled</label>
              <Input
                placeholder="حالت خطا..."
                variant="filled"
                fullWidth
                isRTL={true}
                errorText="این فیلد اجباری است و باید پر شود"
                leftIcon={AlertCircle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>خطا - Standard</label>
              <Input
                placeholder="حالت خطا..."
                variant="standard"
                fullWidth
                isRTL={true}
                errorText="این فیلد اجباری است و باید پر شود"
                leftIcon={AlertCircle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>موفقیت - Outlined</label>
              <Input
                placeholder="حالت موفقیت..."
                variant="outlined"
                fullWidth
                isRTL={true}
                successText="اطلاعات با موفقیت ثبت شد"
                leftIcon={CheckCircle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>موفقیت - Filled</label>
              <Input
                placeholder="حالت موفقیت..."
                variant="filled"
                fullWidth
                isRTL={true}
                successText="اطلاعات با موفقیت ثبت شد"
                leftIcon={CheckCircle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>موفقیت - Standard</label>
              <Input
                placeholder="حالت موفقیت..."
                variant="standard"
                fullWidth
                isRTL={true}
                successText="اطلاعات با موفقیت ثبت شد"
                leftIcon={CheckCircle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>هشدار - Outlined</label>
              <Input
                placeholder="حالت هشدار..."
                variant="outlined"
                fullWidth
                isRTL={true}
                warningText="لطفاً اطلاعات را بررسی کنید"
                leftIcon={AlertTriangle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>هشدار - Filled</label>
              <Input
                placeholder="حالت هشدار..."
                variant="filled"
                fullWidth
                isRTL={true}
                warningText="لطفاً اطلاعات را بررسی کنید"
                leftIcon={AlertTriangle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>هشدار - Standard</label>
              <Input
                placeholder="حالت هشدار..."
                variant="standard"
                fullWidth
                isRTL={true}
                warningText="لطفاً اطلاعات را بررسی کنید"
                leftIcon={AlertTriangle}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>غیرفعال - Outlined</label>
              <Input
                placeholder="حالت غیرفعال..."
                variant="outlined"
                fullWidth
                isRTL={true}
                disabled
                helperText="این ورودی غیرفعال است"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>در حال بارگذاری - Outlined</label>
              <Input
                placeholder="در حال بارگذاری..."
                variant="outlined"
                fullWidth
                isRTL={true}
                loading
                helperText="لطفاً صبر کنید..."
              />
            </div>
          </div>
        </section>

        {/* Special Inputs */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ورودی‌های خاص</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی با متن راهنما</label>
              <Input
                placeholder="متن خود را وارد کنید..."
                fullWidth
                isRTL={true}
                helperText="این متن راهنمای ورودی است و می‌تواند اطلاعات مفیدی ارائه دهد"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی با شمارش کاراکتر</label>
              <Input
                placeholder="حداکثر ۱۰۰ کاراکتر..."
                fullWidth
                isRTL={true}
                maxLength={100}
                showCharacterCount
                helperText="کاراکترهای باقی‌مانده نمایش داده می‌شود"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی اجباری</label>
              <Input
                placeholder="این فیلد اجباری است..."
                fullWidth
                isRTL={true}
                required
                label="فیلد اجباری *"
                helperText="این فیلد باید پر شود"
              />
            </div>
          </div>
        </section>

        {/* Form Example */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>نمونه فرم</h2>
          <div className={styles.formExample}>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>نام و نام خانوادگی</label>
                <Input
                  placeholder="نام و نام خانوادگی خود را وارد کنید..."
                  leftIcon={User}
                  fullWidth
                  isRTL={true}
                  helperText="نام کامل خود را وارد کنید"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>ایمیل</label>
                <Input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید..."
                  leftIcon={Mail}
                  fullWidth
                  isRTL={true}
                  onChange={setEmailValue}
                  helperText="ایمیل معتبر وارد کنید"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>شماره تلفن</label>
                <Input
                  type="tel"
                  placeholder="شماره تلفن خود را وارد کنید..."
                  leftIcon={Phone}
                  fullWidth
                  isRTL={true}
                  onChange={setPhoneValue}
                  helperText="شماره تلفن معتبر وارد کنید"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>آدرس وب</label>
                <Input
                  type="url"
                  placeholder="آدرس وب‌سایت خود را وارد کنید..."
                  leftIcon={Globe}
                  fullWidth
                  isRTL={true}                      
                  onChange={setUrlValue}
                  helperText="آدرس وب‌سایت معتبر وارد کنید"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>نمایش تعاملی</h2>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی تعاملی</label>
              <Input
                placeholder="متن خود را اینجا بنویسید..."
                fullWidth
                isRTL={true}
                leftIcon={User}
                rightIcon={Send}
                rightIconClick={() => alert('ارسال شد!')}
                helperText="این ورودی برای تست تعامل طراحی شده است"
                maxLength={50}
                showCharacterCount
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>ورودی با حالت‌های مختلف</label>
              <Input
                placeholder="متن خود را وارد کنید..."
                fullWidth
                isRTL={true}
                leftIcon={Mail}
                helperText="این ورودی حالت‌های مختلف را نشان می‌دهد"
                state="success"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 