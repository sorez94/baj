'use client';

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  onClick,
  className = '',
  style = {},
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: 'var(--color-card)',
          boxShadow: 'var(--shadow-md)',
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: 'var(--color-card)',
          border: `1px solid var(--color-border)`,
          boxShadow: 'none',
        };
      default:
        return {
          backgroundColor: 'var(--color-card)',
          border: `1px solid var(--color-border)`,
          boxShadow: 'none',
        };
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm':
        return { padding: 'var(--spacing-3)' };
      case 'lg':
        return { padding: 'var(--spacing-6)' };
      default:
        return { padding: 'var(--spacing-4)' };
    }
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.2s ease',
    ...getVariantStyles(),
    ...getPaddingStyles(),
  };

  const interactiveStyles: React.CSSProperties = onClick ? {
    cursor: 'pointer',
  } : {};

  return (
    <div
      className={className}
      style={{ ...baseStyles, ...interactiveStyles, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 