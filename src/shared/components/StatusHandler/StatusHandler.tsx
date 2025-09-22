'use client';

import React from 'react';
import Image from 'next/image';
import {Typography, Button} from '@/shared/components';

interface StatusHandlerProps {
  type: 'error' | 'empty' | 'success' | 'failed' | 'loading';
  title?: string | null;
  description?: string | null;
  image?: string; // New optional image prop
  imageSize?: number;
  onRetry?: () => void;
  retryText?: string;
  onConfirm?: () => void;
  confirmText?: string;
  onDecline?: () => void;
  declineText?: string;
  bodyMargin?: string;
  body?: React.ReactNode; // <-- new body prop
}

const imageMap: Record<string, string> = {
  error: '/assets/images/icons/components/statusHandler/errorImage1.svg',
  empty: '/assets/images/icons/components/statusHandler/emptyBox.svg',
  success: '/assets/images/icons/components/statusHandler/successStatus.svg',
  failed: '/assets/images/icons/components/statusHandler/errorStatus.svg',
};

const textColor = {
  error: 'var(--color-text-primary)',
  empty: 'var(--color-text-primary)',
  success: 'hsla(158, 100%, 21%, 1)',
  failed: 'hsla(0, 75%, 42%, 1)',
  loading: 'var(--color-text-secondary)'
};

const logoSize = {
  error: 180,
  empty: 180,
  success: 64,
  failed: 64,
  loading: 48,
};

const StatusHandler: React.FC<StatusHandlerProps> = ({
  type, title, description, image,imageSize, onRetry, onConfirm, onDecline, retryText, confirmText, declineText, body, bodyMargin
}) => {
  const defaultImageSrc = type !== 'loading' ? (imageMap[type] || imageMap.error) : '';
  const imageSrc = image || defaultImageSrc;

  return (
    <div style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" , width:"100%"}}>
        {/* Icon/Image Section */}
        <div style={{
          marginBottom: 'var(--spacing-6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {type === 'loading' ? (
            <div style={{
              width: logoSize.loading,
              height: logoSize.loading,
              border: '4px solid var(--color-border)',
              borderTop: '4px solid var(--color-primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          ) : (
            <Image
              src={imageSrc}
              alt={`${type} status`}
              width={imageSize ?? logoSize[type as keyof typeof logoSize]}
              height={imageSize ?? logoSize[type as keyof typeof logoSize]}
              priority
            />
          )}
        </div>

        {/* Content Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , width:"100%"}}>
          {title && (
            <Typography variant="titleLarge" style={{ color: textColor[type as keyof typeof textColor], marginBottom: 'var(--spacing-3)', fontWeight: '700', maxWidth: "500px" }}>
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              variant="titleMedium"
              style={{
                color: textColor[type as keyof typeof textColor],
                opacity: 0.8,
                maxWidth: '500px',
              }}
            >
              {description}
            </Typography>
          )}
          {/* Body Section */}
          {body && (
            <div style={{marginTop: bodyMargin, width: '100%', maxWidth: '500px',}}>{body}</div>
          )}
        </div>
      </div>

      {/* Buttons Section - Fixed at Bottom */}
      {type !== 'loading' && (onRetry || onConfirm || onDecline) && (
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          gap: 'var(--spacing-3)',
          width: '100%',
          flexWrap: 'wrap',
          maxWidth: "500px"
        }}>
          {onDecline && (
            <Button variant="outlined" onClick={onDecline} fullWidth style={{ flex: 1 }}>
              {declineText || 'انصراف'}
            </Button>
          )}
           {onRetry && (
            <Button variant="outlined"  onClick={onRetry} fullWidth style={{ flex: 1 }}>
              {retryText || 'تلاش مجدد'}
            </Button>
          )}
          {onConfirm && (
            <Button  onClick={onConfirm} fullWidth style={{ flex: 1 }}>
              {confirmText || 'تائید'}
            </Button>
          )}
        </div>
      )}

      <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default StatusHandler;
