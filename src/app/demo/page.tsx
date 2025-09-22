'use client';
import Link from 'next/link';
import { useTheme } from '@/shared/theme/useTheme';
import styles from './demo.module.scss';

export default function DemoPage() {
  const { isDark, toggle } = useTheme();

  const demoSections = [
    {
      title: '🏠 صفحه اصلی',
      description: 'نمایش صفحه اصلی با قابلیت تغییر تم',
      href: '/demo',
      icon: '🏠',
    },
    {
      title: '🧩 کامپوننت‌ها',
      description: 'کامپوننت‌های قابل استفاده مجدد UI',
      href: '/demo/components',
      icon: '🧩',
      isMainSection: true,
      subItems: [
        {
          title: '🔘 دکمه',
          description: 'سیستم کامل دکمه با Material UI و پشتیبانی RTL',
          href: '/demo/components/button',
          icon: '🔘',
        },
        {
          title: '📝 ورودی',
          description: 'کامپوننت‌های ورودی متن، انتخاب و فرم',
          href: '/demo/components/input',
          icon: '📝',
        },
        {
          title: '🃏 کارت',
          description: 'کارت‌های اطلاعاتی با طرح‌بندی انعطاف‌پذیر',
          href: '/demo/components/card',
          icon: '🃏',
        },
        {
          title: '📋 لیست',
          description: 'لیست‌ها، منوها و ناوبری',
          href: '/demo/components/list',
          icon: '📋',
        },
        {
          title: '🔔 اعلان',
          description: 'اعلان‌ها، پیام‌ها و هشدارها',
          href: '/demo/components/notification',
          icon: '🔔',
        },
        {
          title: '📊 نمودار',
          description: 'نمودارها و نمایش داده‌ها',
          href: '/demo/components/chart',
          icon: '📊',
        },
        {
          title: '🎨 آیکون',
          description: 'کتابخانه آیکون‌ها و نمادها',
          href: '/demo/components/icon',
          icon: '🎨',
        },
        {
          title: '🔧 ابزار',
          description: 'ابزارهای کمکی و کامپوننت‌های خاص',
          href: '/demo/components/utility',
          icon: '🔧',
        },
      ],
    },
    {
      title: '📱 رابط کاربری',
      description: 'نمایش قابلیت‌های مختلف رابط کاربری',
      href: '/demo/ui-state',
      icon: '📱',
    },
    {
      title: '🎨 طراحی',
      description: 'نمایش سیستم طراحی و تم',
      href: '/demo/design',
      icon: '🎨',
    },
    {
      title: '📝 فرم‌ها',
      description: 'نمایش فرم‌ها و ورودی‌ها',
      href: '/demo/forms',
      icon: '📝',
    },
    {
      title: '🔍 جستجو',
      description: 'نمایش قابلیت‌های جستجو',
      href: '/demo/search',
      icon: '🔍',
    },
  ];

  return (
    <div className={styles.container} dir="rtl">
      {/* Theme Toggle */}
      <div className={styles.themeToggle}>
        <button
          onClick={toggle}
          className={styles.themeButton}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      <div className={styles.contentWrapper}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <span>🎯</span>
          </div>
          <h1 className={styles.title}>
            دمو و مستندات
          </h1>
          <p className={styles.subtitle}>
            سیستم طراحی، کامپوننت‌ها و الگوهای مورد استفاده در باجت PWA را کاوش کنید.
            اینجا زمین بازی شما برای تست و مستندسازی عناصر قابل استفاده مجدد است.
          </p>
          <div className={styles.statusIndicators}>
            <div className={styles.statusItem}>
              <div className={styles.statusDot}></div>
              <span>آماده برای استفاده</span>
            </div>
            <div className={styles.statusDivider}></div>
            <div className={styles.statusItem}>
              <div className={styles.statusDot}></div>
              <span>پشتیبانی از RTL</span>
            </div>
          </div>
        </div>

        {/* Demo Sections Grid */}
        <div className={styles.demoGrid}>
          {demoSections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className={styles.demoCard}
            >
              <div className={styles.cardGradient} />
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>{section.icon}</div>
                <h3 className={styles.cardTitle}>{section.title}</h3>
                <p className={styles.cardDescription}>{section.description}</p>
                
                {/* Show submenu items if they exist */}
                {section.subItems && (
                  <div className={styles.subMenu}>
                    <div className={styles.subMenuTitle}>کامپوننت‌های موجود:</div>
                    <div className={styles.subMenuItems}>
                      {section.subItems.map((subItem, subIndex) => (
                        <div key={subIndex} className={styles.subMenuItem}>
                          <span className={styles.subMenuIcon}>{subItem.icon}</span>
                          <span className={styles.subMenuText}>{subItem.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className={styles.cardArrow}>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Sections */}
        <div className={styles.infoSections}>
          {/* How to Use Section */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>
              <span className={styles.infoIcon}>💡</span>
              نحوه استفاده از این دمو
            </h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoColumn}>
                <h3 className={styles.infoSubtitle}>
                  <span className={styles.infoSubIcon}>🎨</span>
                  سیستم طراحی
                </h3>
                <ul className={styles.infoList}>
                  <li>هر بخش عناصر طراحی خاصی را نشان می‌دهد</li>
                  <li>الگوها و کدها را برای ویژگی‌های خود کپی کنید</li>
                  <li>تغییرات و ترکیبات مختلف را تست کنید</li>
                </ul>
              </div>
              <div className={styles.infoColumn}>
                <h3 className={styles.infoSubtitle}>
                  <span className={styles.infoSubIcon}>🚀</span>
                  توسعه
                </h3>
                <ul className={styles.infoList}>
                  <li>از این به عنوان مرجع برای طراحی یکپارچه استفاده کنید</li>
                  <li>الگوهای تثبیت شده را دنبال کنید</li>
                  <li>کامپوننت‌های مقیاس‌پذیر و قابل نگهداری بسازید</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RTL Support Section */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>
              <span className={styles.infoIcon}>🌍</span>
              پشتیبانی از RTL
            </h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoColumn}>
                <h3 className={styles.infoSubtitle}>
                  <span className={styles.infoSubIcon}>📱</span>
                  رابط کاربری
                </h3>
                <ul className={styles.infoList}>
                  <li>پشتیبانی کامل از راست به چپ (RTL)</li>
                  <li>متن‌های فارسی و عربی</li>
                  <li>چیدمان مناسب برای زبان‌های RTL</li>
                </ul>
              </div>
              <div className={styles.infoColumn}>
                <h3 className={styles.infoSubtitle}>
                  <span className={styles.infoSubIcon}>🎨</span>
                  طراحی
                </h3>
                <ul className={styles.infoList}>
                  <li>رنگ‌بندی و فونت‌های مناسب</li>
                  <li>فاصله‌گذاری و اندازه‌گیری استاندارد</li>
                  <li>حالت تاریک خودکار</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Start Section */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>
              <span className={styles.infoIcon}>⚡</span>
              شروع سریع
            </h2>
            <div className={styles.quickStart}>
              <p className={styles.quickStartText}>
                برای شروع، یکی از بخش‌های بالا را انتخاب کنید. هر بخش شامل مثال‌های عملی، 
                کدهای قابل کپی و راهنمای استفاده است.
              </p>
              <div className={styles.quickStartIndicators}>
                <div className={styles.bounceDot}></div>
                <span>روی هر کارت کلیک کنید تا شروع کنید</span>
                <div className={styles.bounceDot} style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 