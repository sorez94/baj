import Link from 'next/link';
import styles from './theme.module.scss';

export default function ThemeDemoPage() {
  const primaryColors = [
    { key: '50', value: 'var(--color-primary-50)' },
    { key: '100', value: 'var(--color-primary-100)' },
    { key: '200', value: 'var(--color-primary-200)' },
    { key: '300', value: 'var(--color-primary-300)' },
    { key: '400', value: 'var(--color-primary-400)' },
    { key: '500', value: 'var(--color-primary-500)' },
    { key: '600', value: 'var(--color-primary-600)' },
    { key: '700', value: 'var(--color-primary-700)' },
    { key: '800', value: 'var(--color-primary-800)' },
    { key: '900', value: 'var(--color-primary-900)' },
    { key: '950', value: 'var(--color-primary-950)' },
  ];

  const spacingScales = [
    { key: '1', value: 'var(--spacing-1)' },
    { key: '2', value: 'var(--spacing-2)' },
    { key: '3', value: 'var(--spacing-3)' },
    { key: '4', value: 'var(--spacing-4)' },
    { key: '5', value: 'var(--spacing-5)' },
    { key: '6', value: 'var(--spacing-6)' },
    { key: '8', value: 'var(--spacing-8)' },
    { key: '10', value: 'var(--spacing-10)' },
    { key: '12', value: 'var(--spacing-12)' },
    { key: '16', value: 'var(--spacing-16)' },
    { key: '20', value: 'var(--spacing-20)' },
    { key: '24', value: 'var(--spacing-24)' },
  ];

  const buttonSizes = [
    { key: 'xs', height: 'var(--button-height-xs)', padding: 'var(--spacing-2) var(--spacing-4)', fontSize: 'var(--font-size-xs)', borderRadius: 'var(--radius-xs)' },
    { key: 'sm', height: 'var(--button-height-sm)', padding: 'var(--spacing-2) var(--spacing-4)', fontSize: 'var(--font-size-sm)', borderRadius: 'var(--radius-sm)' },
    { key: 'md', height: 'var(--button-height-md)', padding: 'var(--spacing-2) var(--spacing-4)', fontSize: 'var(--font-size-base)', borderRadius: 'var(--radius-md)' },
    { key: 'lg', height: 'var(--button-height-lg)', padding: 'var(--spacing-3) var(--spacing-6)', fontSize: 'var(--font-size-lg)', borderRadius: 'var(--radius-lg)' },
    { key: 'xl', height: 'var(--button-height-xl)', padding: 'var(--spacing-4) var(--spacing-8)', fontSize: 'var(--font-size-xl)', borderRadius: 'var(--radius-xl)' },
  ];

  const fontSizes = [
    { key: 'xs', value: 'var(--font-size-xs)' },
    { key: 'sm', value: 'var(--font-size-sm)' },
    { key: 'base', value: 'var(--font-size-base)' },
    { key: 'lg', value: 'var(--font-size-lg)' },
    { key: 'xl', value: 'var(--font-size-xl)' },
    { key: '2xl', value: 'var(--font-size-2xl)' },
    { key: '3xl', value: 'var(--font-size-3xl)' },
    { key: '4xl', value: 'var(--font-size-4xl)' },
  ];

  const headingStyles = [
    { key: 'h1', fontSize: 'var(--font-size-4xl)', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)', letterSpacing: 'var(--letter-spacing-tight)' },
    { key: 'h2', fontSize: 'var(--font-size-3xl)', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-tight)' },
    { key: 'h3', fontSize: 'var(--font-size-2xl)', lineHeight: 'var(--line-height-snug)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-tight)' },
    { key: 'h4', fontSize: 'var(--font-size-xl)', lineHeight: 'var(--line-height-snug)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-tight)' },
    { key: 'h5', fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-snug)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-tight)' },
    { key: 'h6', fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-snug)', fontWeight: 'var(--font-weight-semibold)', letterSpacing: 'var(--letter-spacing-tight)' },
  ];

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/demo" className={styles.backLink}>
            بازگشت به دمو ←
          </Link>
          <h1 className={styles.title}>
            🎨 سیستم طراحی
          </h1>
          <p className={styles.subtitle}>
            توکن‌های طراحی برای رنگ‌ها، فاصله‌گذاری، اندازه‌گیری و تایپوگرافی
          </p>
        </div>

        {/* Colors Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>رنگ‌ها</h2>
          
          {/* Primary Colors */}
          <div className={styles.section}>
            <h3 className={styles.sectionSubtitle}>رنگ‌های اصلی</h3>
            <div className={styles.colorGrid}>
              {primaryColors.map(({ key, value }) => (
                <div key={key} className={styles.colorSwatch}>
                  <div 
                    className={styles.colorBox}
                    style={{ backgroundColor: value }}
                  />
                  <div className={styles.colorLabel}>{key}</div>
                  <div className={styles.colorValue}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className={styles.section}>
            <h3 className={styles.sectionSubtitle}>رنگ‌های معنایی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: 'var(--color-success-500)' }} />
                <div>
                  <div className="font-medium">موفقیت 500</div>
                  <div className="text-sm text-gray-500 font-mono">var(--color-success-500)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: 'var(--color-error-500)' }} />
                <div>
                  <div className="font-medium">خطا 500</div>
                  <div className="text-sm text-gray-500 font-mono">var(--color-error-500)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: 'var(--color-warning-500)' }} />
                <div>
                  <div className="font-medium">هشدار 500</div>
                  <div className="text-sm text-gray-500 font-mono">var(--color-warning-500)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: 'var(--color-neutral-500)' }} />
                <div>
                  <div className="font-medium">خنثی 500</div>
                  <div className="text-sm text-gray-500 font-mono">var(--color-neutral-500)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>اندازه‌ها و فاصله‌گذاری</h2>
          
          {/* Spacing Scale */}
          <div className={styles.section}>
            <h3 className={styles.sectionSubtitle}>مقیاس فاصله‌گذاری (پایه 4 پیکسل)</h3>
            <div className={styles.spacingGrid}>
              {spacingScales.map(({ key, value }) => (
                <div key={key} className={styles.spacingItem}>
                  <div 
                    className={styles.spacingBar}
                    style={{ width: value }}
                  />
                  <div className={styles.spacingLabel}>{key}</div>
                  <div className={styles.spacingValue}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Component Sizes */}
          <div className={styles.section}>
            <h3 className={styles.sectionSubtitle}>اندازه‌های دکمه</h3>
            <div className={styles.componentSizes}>
              {buttonSizes.map(({ key, height, padding, fontSize, borderRadius }) => (
                <div key={key} className={styles.sizeRow}>
                  <button 
                    className={styles.sizeButton}
                    style={{
                      height,
                      padding,
                      fontSize,
                      borderRadius,
                    }}
                  >
                    {key.toUpperCase()}
                  </button>
                  <div className={styles.sizeInfo}>
                    <div>ارتفاع: {height}</div>
                    <div>پدینگ: {padding}</div>
                    <div>فونت: {fontSize}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>تایپوگرافی</h2>
          
          {/* Font Sizes */}
          <div className={styles.typographySection}>
            <h3 className={styles.sectionSubtitle}>اندازه‌های فونت</h3>
            <div className="space-y-2">
              {fontSizes.map(({ key, value }) => (
                <div key={key} className={styles.fontSizeRow}>
                  <div 
                    className={styles.fontSizeText}
                    style={{ fontSize: value }}
                  >
                    {key.toUpperCase()} - {value}
                  </div>
                  <div className={styles.fontSizeValue}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Styles */}
          <div className={styles.typographySection}>
            <h3 className={styles.sectionSubtitle}>استایل‌های متن</h3>
            <div className="space-y-4">
              {headingStyles.map(({ key, fontSize, lineHeight, fontWeight, letterSpacing }) => (
                <div key={key} className={styles.textStyleRow}>
                  <div 
                    className={styles.fontSizeText}
                    style={{
                      fontSize,
                      lineHeight,
                      fontWeight,
                      letterSpacing,
                    }}
                  >
                    {key.toUpperCase()} عنوان
                  </div>
                  <div className={styles.textStyleLabel}>
                    {fontSize} / {lineHeight} / {fontWeight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className={styles.usageSection}>
          <h2 className={styles.sectionTitle}>نمونه‌های استفاده</h2>
          <div className={styles.usageCard}>
            <h3 className={styles.usageTitle}>نحوه استفاده در CSS Modules</h3>
            <pre className={styles.codeBlock}>
{`/* Component.module.scss */
.container {
  background-color: var(--color-bg-primary);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
}

.button {
  background-color: var(--color-interactive-primary);
  color: white;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: var(--color-interactive-primary-hover);
}`}
            </pre>
          </div>
        </section>

        {/* Dark Mode Toggle Info */}
        <section className={styles.usageSection}>
          <h2 className={styles.sectionTitle}>حالت تاریک</h2>
          <div className={styles.usageCard}>
            <h3 className={styles.usageTitle}>پشتیبانی خودکار از حالت تاریک</h3>
            <p className="mb-4 text-right">
              این سیستم طراحی به طور خودکار از حالت تاریک با استفاده از CSS media queries پشتیبانی می‌کند. 
              تمام رنگ‌های معنایی بر اساس ترجیح سیستم کاربر به طور خودکار تنظیم می‌شوند.
            </p>
            <pre className={styles.codeBlock}>
{`/* حالت تاریک به طور خودکار مدیریت می‌شود */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: var(--color-neutral-50);
    --color-bg-primary: var(--color-neutral-900);
    /* ... موارد بیشتر برای حالت تاریک */
  }
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 