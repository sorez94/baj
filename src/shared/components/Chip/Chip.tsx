'use client';

import React from 'react';
import { Typography } from '@/shared/components';

export type ChipVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  style,
  onClick,
  disabled = false,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      border: 'none',
      outline: 'none',
    };

    const variantStyles: Record<ChipVariant, React.CSSProperties> = {
      default: {
        backgroundColor: 'var(--color-input-secondary)',
        color: 'var(--color-text-secondary)',

      },
      primary: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-on-primary)',
      },
      secondary: {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-on-secondary)',
      },
      success: {
        backgroundColor: 'var(--color-success-light)',
        color: 'var(--color-success-dark)',
        // border: '1px solid var(--color-success)',
      },
      warning: {
        backgroundColor: 'var(--color-warning)',
        // border: '1px solid var(--color-warning)',
      },
      error: {
        backgroundColor: 'var(--color-error-light)',
        color: 'var(--color-text-secondary)',
        // border: '1px solid var(--color-error)',
      },
      info: {
        backgroundColor: 'var(--color-primary-dark)',
        // color: 'var(--color-text-primary)',
        // border: '1px solid var(--color-info)',
      },
    };

    const sizeStyles: Record<ChipSize, React.CSSProperties> = {
      sm: {
        padding: 'var(--spacing-1) var(--spacing-2)',
        fontSize: '12px',
        minHeight: '20px',
      },
      md: { // for now we just using md size
        padding: 'var(--spacing-1) var(--spacing-2)',
      },
      lg: {
        padding: 'var(--spacing-3) var(--spacing-4)',
        fontSize: '16px',
        minHeight: '32px',
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const chipStyles = getVariantStyles();

  return (
    <div
      className={className}
      style={{ ...chipStyles, ...style }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick && !disabled ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-disabled={disabled}
    >
      <Typography 
        variant="labelSmall" 
        style = {
          {
            color : "inherit",
            fontWeight : "inherit",
            lineHeight : "inherit",
            textTransform : "inherit",
            textAlign : "inherit",
            textDecoration : "inherit",
            textOverflow : "inherit",
          }
        }
      >
        {children}
      </Typography>
    </div>
  );
};

export default Chip; 