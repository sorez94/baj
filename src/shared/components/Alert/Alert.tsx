'use client';

import React from 'react';
import { Typography, DynamicIcons } from '@/shared/components';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  closable?: boolean;
  icon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  size = 'md',
  title,
  className,
  style,
  onClose,
  closable = false,
  icon = true,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-3)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--spacing-4)',
      position: 'relative',
    };

    const variantStyles: Record<AlertVariant, React.CSSProperties> = {
      info: {
        backgroundColor: 'var(--color-input-secondary)',
      },
      success: {
        backgroundColor: 'var(--color-success)',
      },
      warning: {
        backgroundColor: 'var(--color-warning)',
      },
      error: {
        backgroundColor: 'var(--color-error)',
      },
    };

    const sizeStyles: Record<AlertSize, React.CSSProperties> = {
      sm: {
        padding: 'var(--spacing-2) var(--spacing-3)',
        fontSize: '14px',
      },
      md: {
        padding: 'var(--spacing-3) var(--spacing-4)',
        fontSize: '16px',
      },
      lg: {
        padding: 'var(--spacing-4) var(--spacing-5)',
        fontSize: '18px',
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };
  };

  const getIconType = (): string => {
    switch (variant) {
      case 'info':
        return 'info';
      case 'success':
        return 'check';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error_status';
      default:
        return 'info';
    }
  };

  const getIconColor = (): string => {
    switch (variant) {
      case 'info':
        return 'var(--color-text-primary)';
      case 'success':
        return 'var(--color-text-primary)';
      case 'warning':
        return 'var(--color-text-primary)';
      case 'error':
        return 'var(--color-text-primary)';
      default:
        return 'var(--color-text-primary)';
    }
  };

  const alertStyles = getVariantStyles();

  return (
    <div
      className={className}
      style={{ ...alertStyles, ...style }}
    >
      {/* Icon */}
      {icon && (
        <div style={{ flexShrink: 0, marginTop: '6px' }}>
          <DynamicIcons
            type={getIconType() as any}
            color={getIconColor()}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <Typography
            variant="titleMedium"
            style={{
              marginBottom: 'var(--spacing-1)',
            }}
          >
            {title}
          </Typography>
        )}
        
        <Typography
          variant="bodyMedium"
        >
          {children}
        </Typography>
      </div>

      {/* Close Button */}
      {closable && onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--spacing-1)',
            borderRadius: 'var(--radius-sm)',
            color: 'inherit',
            opacity: 0.7,
            transition: 'opacity 0.2s ease',
            flexShrink: 0,
            marginTop: '2px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          aria-label="Close alert"
        >
          <DynamicIcons
            type="close"
            width={16}
            height={16}
            style={{ color: 'inherit' }}
          />
        </button>
      )}
    </div>
  );
};

export default Alert; 