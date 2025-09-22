'use client';

import React, {useState} from 'react';
import {useTheme} from '@/shared/theme/useTheme';
import styles from './SnackbarDemo.module.scss';
import Button from "@/shared/components/Button/Button";
import Snackbar from "@/shared/components/Snackbar/Snackbar";

export const SnackbarDemo = () => {
  const {isDark, toggle} = useTheme();
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const handleOpenSnackbar = (value: 'error' | 'warning' | 'info' | 'success') => {
    setOpenError(false);
    setOpenInfo(false);
    setOpenSuccess(false);
    setOpenWarning(false);
    switch (value) {
      case 'error':
        setOpenError(true);
        break;
      case 'warning':
        setOpenWarning(true);
        break;
      case 'info':
        setOpenInfo(true);
        break;
      case 'success':
        setOpenSuccess(true);
        break;
      default:
        break;
    }
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
              <Button
                className={styles.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSnackbar('success');
                }}
                variant={'filled'}
              >
                success snackbar
              </Button>
              <Snackbar
                open={openSuccess}
                message="هورا! موفق شدی"
                variant="success"
                onClose={() => setOpenSuccess(false)}
              />
            </div>
            <div className={styles.inputGroup}>
              <Button
                className={styles.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSnackbar('error');
                }}
                variant={'filled'}
              >
                error snackbar
              </Button>
              <Snackbar
                open={openError}
                message="ای بابا! نشد :("
                variant="error"
                onClose={() => setOpenSuccess(false)}
              />
            </div>
            <div className={styles.inputGroup}>
              <Button
                className={styles.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSnackbar('info');
                }}
                variant={'filled'}
              >
                info snackbar
              </Button>
              <Snackbar
                open={openInfo}
                message="فقط اطلاعات"
                variant="info"
                onClose={() => setOpenSuccess(false)}
              />
            </div>
            <div className={styles.inputGroup}>
              <Button
                className={styles.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSnackbar('warning');
                }}
                variant={'filled'}
              >
                warning snackbar
              </Button>
              <Snackbar
                open={openWarning}
                message="این یک هشدار است"
                variant="warning"
                onClose={() => setOpenSuccess(false)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
