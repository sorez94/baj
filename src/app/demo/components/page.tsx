'use client';

import Link from 'next/link';
import { 
  HomeIcon, 
  ArrowLeftIcon,
  MousePointer2Icon,
  TypeIcon,
  CreditCardIcon,
  ListIcon,
  BellIcon,
  BarChart3Icon,
  PaletteIcon,
  WrenchIcon
} from 'lucide-react';
import styles from './components.module.scss';

export default function ComponentsPage() {
  const components = [
    {
      title: '🔘 دکمه',
      description: 'سیستم کامل دکمه با Material UI و پشتیبانی RTL',
      href: '/demo/components/button',
      icon: <MousePointer2Icon size={24} />,
      status: 'ready',
      features: ['8 نوع مختلف', '5 اندازه', 'پشتیبانی RTL', 'حالت بارگذاری'],
    },
    {
      title: '📝 ورودی',
      description: 'کامپوننت‌های ورودی متن، انتخاب و فرم',
      href: '/demo/components/input',
      icon: <TypeIcon size={24} />,
      status: 'ready',
      features: ['8 نوع مختلف', '3 اندازه', 'پشتیبانی RTL', 'حالت‌های مختلف'],
    },
    {
      title: '🃏 کارت',
      description: 'کارت‌های اطلاعاتی با طرح‌بندی انعطاف‌پذیر',
      href: '/demo/components/card',
      icon: <CreditCardIcon size={24} />,
      status: 'planned',
      features: ['طرح‌بندی انعطاف‌پذیر', 'سایه‌ها', 'انیمیشن‌ها', 'پاسخگو'],
    },
    {
      title: '📋 لیست',
      description: 'لیست‌ها، منوها و ناوبری',
      href: '/demo/components/list',
      icon: <ListIcon size={24} />,
      status: 'planned',
      features: ['لیست‌های ساده', 'منوها', 'ناوبری', 'درخت'],
    },
    {
      title: '👆 انتخاب',
      description: 'انتخاب',
      href: '/demo/components/select',
      icon: <ListIcon size={24} />,
      status: 'ready',
      features: ['حالت‌های مختلف'],
    },
    {
      title: '👆 snackbar ⚠️',
      description: 'snackbar',
      href: '/demo/components/snackbar',
      icon: <ListIcon size={24} />,
      status: 'ready',
      features: ['حالت‌های مختلف'],
    },
    {
      title: '🔔 اعلان',
      description: 'اعلان‌ها، پیام‌ها و هشدارها',
      href: '/demo/components/notification',
      icon: <BellIcon size={24} />,
      status: 'planned',
      features: ['اعلان‌ها', 'پیام‌ها', 'هشدارها', 'تست‌ها'],
    },
    {
      title: '📊 نمودار',
      description: 'نمودارها و نمایش داده‌ها',
      href: '/demo/components/chart',
      icon: <BarChart3Icon size={24} />,
      status: 'planned',
      features: ['نمودارهای خطی', 'نمودارهای ستونی', 'پای', 'نوار پیشرفت'],
    },
    {
      title: '🎨 آیکون',
      description: 'کتابخانه آیکون‌ها و نمادها',
      href: '/demo/components/icon',
      icon: <PaletteIcon size={24} />,
      status: 'planned',
      features: ['آیکون‌های Material', 'آیکون‌های Lucide', 'نمادها', 'انیمیشن‌ها'],
    },
    {
      title: '🔧 ابزار',
      description: 'ابزارهای کمکی و کامپوننت‌های خاص',
      href: '/demo/components/utility',
      icon: <WrenchIcon size={24} />,
      status: 'planned',
      features: ['مولتی‌سلکت', 'تاریخ', 'اسلایدر', 'پاپ‌آپ'],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return styles.statusReady;
      case 'planned':
        return styles.statusPlanned;
      case 'in-progress':
        return styles.statusInProgress;
      default:
        return styles.statusPlanned;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'آماده';
      case 'planned':
        return 'برنامه‌ریزی شده';
      case 'in-progress':
        return 'در حال توسعه';
      default:
        return 'برنامه‌ریزی شده';
    }
  };

  return (
    <div className={styles.container} >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/demo" className={styles.backButton}>
            <ArrowLeftIcon size={20} />
            <span>بازگشت به دمو</span>
          </Link>
          
          <div className={styles.headerMain}>
            <div className={styles.headerIcon}>
              <span>🧩</span>
            </div>
            <div>
              <h1 className={styles.title}>کامپوننت‌های UI</h1>
              <p className={styles.subtitle}>
                کتابخانه کامل کامپوننت‌های قابل استفاده مجدد با Material UI و پشتیبانی RTL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className={styles.componentsGrid}>
        {components.map((component, index) => (
          <Link
            key={index}
            href={component.href}
            className={styles.componentCard}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                {component.icon}
              </div>
              <div className={styles.cardStatus}>
                <span className={`${styles.statusBadge} ${getStatusColor(component.status)}`}>
                  {getStatusText(component.status)}
                </span>
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{component.title}</h3>
              <p className={styles.cardDescription}>{component.description}</p>
              
              <div className={styles.cardFeatures}>
                <h4 className={styles.featuresTitle}>ویژگی‌ها:</h4>
                <ul className={styles.featuresList}>
                  {component.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={styles.cardArrow}>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>درباره کامپوننت‌ها</h3>
          <p>
            تمام کامپوننت‌ها با Material Design 3 طراحی شده‌اند و از سیستم رنگ و تم سفارشی ما استفاده می‌کنند. 
            پشتیبانی کامل از RTL و دسترسی‌پذیری در تمام کامپوننت‌ها گنجانده شده است.
          </p>
        </div>
      </div>
    </div>
  );
} 