"use client"
import { useEffect, useState } from "react";
import styles from "./offline.module.scss";
import {Button} from "@/shared/components";

/**
 * صفحه آفلاین برای PWA/SPA
 * - وقتی navigator.onLine === false باشه نمایش داده میشه
 * - رویدادهای 'online' / 'offline' رو گوش می‌ده
 * - از آیکون public/icons/icon-192x192.png استفاده می‌کنه
 */
export default function Offline() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : false
  );

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const reload = () => window.location.reload();
  const openHome = () => (window.location.href = "/");

  return (
    <main className={styles.wrapper} role="main" aria-busy={!isOnline}>
      <section className={styles.card} aria-live="polite" dir="rtl">
        <img
          src="/icons/icon-192x192.png"
          width={128}
          height={128}
          alt="آیکون برنامه"
          className={styles.icon}
        />
        <header className={styles.header}>
          <div>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>
                {isOnline ? "اتصال برقرار شد" : "شما آفلاین هستید"}
              </h1>
              <span className={styles.pill}>
                {isOnline ? "آنلاین" : "بدون اتصال"}
              </span>
            </div>
            <p className={styles.lead}>
              {isOnline
                ? "عالیه! می‌تونید ادامه بدید."
                : "اتصال اینترنت شناسایی نشد. بعضی قابلیت‌ها در دسترس نیستند، اما محتوای کش شده همچنان کار می‌کند."}
            </p>
          </div>
        </header>

        <div className={styles.grid}>
          {!isOnline && (
            <div className={styles.section}>
              <div className={styles.buttons}>
                <Button
                  className={`${styles.button} ${styles.primary}`}
                  onClick={reload}
                >
                  تلاش مجدد
                </Button>
                <Button
                  className={`${styles.button} ${styles.subtle}`}
                  onClick={openHome}
                >
                  رفتن به خانه
                </Button>
              </div>
            </div>
          )}

          {isOnline && (
            <div className={styles.section}>
              <div className={styles.buttons}>
                <Button
                  className={`${styles.button} ${styles.primary}`}
                  onClick={openHome}
                >
                  ادامه
                </Button>
                <Button className={`${styles.button}`} onClick={reload}>
                  بارگذاری مجدد
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
