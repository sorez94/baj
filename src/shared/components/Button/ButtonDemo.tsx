'use client';

import React from 'react';
import { Button } from './Button';
import { PlusIcon, SunIcon, MoonIcon, SettingsIcon, XIcon, HeartIcon, StarIcon } from 'lucide-react';
import styles from './ButtonDemo.module.scss';
import { useTheme } from '../../theme/useTheme';

export const ButtonDemo: React.FC = () => {
  const { isDark, toggle } = useTheme();
  const [isThemeLoading, setIsThemeLoading] = React.useState(false);
  
  const handleThemeToggle = async () => {
    setIsThemeLoading(true);
    // Simulate a small delay for theme switching
    setTimeout(() => {
      toggle();
      setIsThemeLoading(false);
    }, 500);
  };
  
  const buttonVariants = [
    { name: 'Filled button', variant: 'filled' as const },
    { name: 'Filled tonal button', variant: 'filled-tonal' as const },
    { name: 'Outlined button', variant: 'outlined' as const },
    { name: 'Text button', variant: 'text' as const },
    { name: 'Elevated button', variant: 'elevated' as const },
  ];

  const buttonStates = [
    { label: 'Default', disabled: false, loading: false },
    { label: 'Hover', disabled: false, loading: false },
    { label: 'Pressed', disabled: false, loading: false },
    { label: 'Focus', disabled: false, loading: false },
    { label: 'Disabled', disabled: true, loading: false },
    { label: 'Loading', disabled: false, loading: true },
  ];

  // Icon-only button examples
  const iconButtonExamples = [
    { name: 'Icon Filled', variant: 'filled' as const, icon: <PlusIcon size={16} /> },
    { name: 'Icon Tonal', variant: 'filled-tonal' as const, icon: <SettingsIcon size={16} /> },
    { name: 'Icon Outlined', variant: 'outlined' as const, icon: <XIcon size={16} /> },
    { name: 'Icon Text', variant: 'text' as const, icon: <HeartIcon size={16} /> },
    { name: 'Icon Elevated', variant: 'elevated' as const, icon: <StarIcon size={16} /> },
  ];

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1>Button Component Demo</h1>
            <p>Material Design 3 Button Variants</p>
          </div>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleThemeToggle}
            loading={isThemeLoading}
            leftIcon={isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            className={styles.themeToggle}
          >
            {isDark ? 'روشن' : 'تاریک'}
          </Button>
        </div>
      </div>

      <div className={styles.buttonGrid}>
        {buttonVariants.map((variant) => (
          <div key={variant.variant} className={styles.variantRow}>
            <div className={styles.variantLabel}>{variant.name}</div>
            <div className={styles.buttonStates}>
              {buttonStates.map((state, index) => (
                <Button
                  key={index}
                  variant={variant.variant}
                  size="md"
                  disabled={state.disabled}
                  loading={state.loading}
                  leftIcon={index < 4 ? <PlusIcon size={16} /> : undefined}
                  className={styles.demoButton}
                >
                  کامن باتن
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Icon-only buttons section */}
      <div className={styles.iconSection}>
        <h2>Icon-Only Buttons (Auto-Circular)</h2>
        <p>Buttons automatically become circular when they only have an icon and no text</p>
        <div className={styles.iconButtonGrid}>
          {iconButtonExamples.map((example, index) => (
            <div key={index} className={styles.iconButtonExample}>
              <div className={styles.iconButtonLabel}>{example.name}</div>
              <Button
                variant={example.variant}
                size="md"
                leftIcon={example.icon}
                className={styles.iconButton}
              >
                {/* Empty children to make it icon-only */}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo; 