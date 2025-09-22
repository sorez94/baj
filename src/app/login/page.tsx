'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tokenService } from '@/services/auth';
import { registerByPhoneNumber, tokenOperationWithOtp } from '@/services/auth/authApi';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendPhone = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerByPhoneNumber({ phoneNumber: phone });
      setStep('otp');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'ارسال کد ناموفق بود');
    } finally {
      setLoading(false);
    }
  }, [phone]);

  const handleVerifyOtp = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await tokenOperationWithOtp(phone, otp);
      const accessToken = data.access_token || data.accessToken || data.token || '';
      const refreshToken = data.refresh_token || data.refreshToken || '';
      const expiresIn = Number(data.expires_in || data.expiresIn || 3600);
      const userId = String(data.user_id || data.userId || phone || '');

      if (!accessToken) throw new Error(data.error_description || data.message || 'Token not received');

      tokenService.storeTokens({ accessToken, refreshToken, expiresIn, userId });
      router.push('/cheque');
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'ورود ناموفق بود');
    } finally {
      setLoading(false);
    }
  }, [phone, otp, router]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-background)',
        color: 'var(--color-text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-8)'
      }}
    >
      <form
        onSubmit={step === 'phone' ? handleSendPhone : handleVerifyOtp}
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-6)'
        }}
      >
        <h1 style={{
          margin: 0,
          marginBottom: 'var(--spacing-6)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-bold)'
        }}>{step === 'phone' ? 'ورود با شماره موبایل' : 'تایید کد ارسال‌شده'}</h1>

        {step === 'phone' ? (
          <>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-2)' }}>شماره موبایل</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xxxxxxxxx"
              style={{
                width: '100%', height: 44,
                padding: '0 var(--spacing-2)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
            />
          </>
        ) : (
          <>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-2)' }}>کد یک‌بارمصرف</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="کد ۶ رقمی"
              style={{
                width: '100%', height: 44,
                padding: '0 var(--spacing-2)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
            />
          </>
        )}

        {error && (
          <div style={{ color: 'var(--color-error)', marginTop: 'var(--spacing-4)' }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={(step === 'phone' ? !phone : !otp) || loading}
          style={{
            width: '100%', height: 44,
            marginTop: 'var(--spacing-6)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-primary)',
            background: 'var(--color-primary)',
            color: 'white',
            cursor: ((step === 'phone' ? !phone : !otp) || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'در حال ارسال...' : (step === 'phone' ? 'ارسال کد' : 'ورود')}
        </button>
      </form>
    </main>
  );
} 