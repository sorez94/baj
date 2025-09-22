'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Typography, DynamicIcons } from '@/shared/components';
import { fontFamilies } from '@/shared/utils/fonts';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'auto';
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'متن راهنما',
  value: externalValue,
  onChange,
  onSearch,
  onClear,
  className,
  style,
  disabled = false,
  loading = false,
  clearable = true,
  searchable = true,
  size = 'md',
  theme = 'auto',
  debounceMs = 300
}) => {
  const [internalValue, setInternalValue] = useState(externalValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Sync with external value
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const currentValue = externalValue !== undefined ? externalValue : internalValue;

  // Debounced onChange handler
  const debouncedOnChange = useCallback((value: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      onChange?.(value);
    }, debounceMs);
  }, [onChange, debounceMs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    if (currentValue.trim()) {
      onSearch?.(currentValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Size configurations
  const sizeConfig = {
    sm: {
      height: '32px',
      fontSize: '14px',
      iconSize: 16,
      padding: 'var(--spacing-2) var(--spacing-3)',
    },
    md: {
      height: '56px',
      fontSize: '16px',
      iconSize: 20,
      padding: 'var(--spacing-3) var(--spacing-4)',
    },
    lg: {
      height: '48px',
      fontSize: '18px',
      iconSize: 24,
      padding: 'var(--spacing-4) var(--spacing-5)',
    },
  };

  const currentSize = sizeConfig[size];

  // Theme-based styles
  const getThemeStyles = () => {
    if (theme === 'dark') {
      return {
        backgroundColor: 'var(--color-input-secondary)',
        color: 'var(--color-text-primary)',
        iconColor: 'var(--color-text-secondary-light)',
      };
    }
    if (theme === 'light') {
      return {
        backgroundColor: 'var(--color-input-secondary)',
        color: 'var(--color-text-primary)',
        iconColor: 'var(--color-text-secondary-dark)',
      };
    }
    // Auto theme - use CSS variables
    return {
      backgroundColor: 'var(--color-input-secondary)',
      color: 'var(--color-text-primary)',
      iconColor: 'var(--color-text-secondary)',
    };
  };

  const themeStyles = getThemeStyles();

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: themeStyles.backgroundColor,
    borderRadius: "72px",
    padding: currentSize.padding,
    height: currentSize.height,
    // border: isFocused ? '2px solid var(--color-primary)' : 'none',
    transition: 'all 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const inputStyles: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'var(--color-input-secondary)',
    color: themeStyles.color,
    fontSize: currentSize.fontSize,
    fontFamily: fontFamilies.yekan400,
    textAlign: 'right',
    direction: 'rtl',
    cursor: disabled ? 'not-allowed' : 'text',
    ...(disabled && { pointerEvents: 'none' }),
  };

  const iconStyles: React.CSSProperties = {
    color: themeStyles.iconColor,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    flexShrink: 0,
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Search Icon (Right side in RTL) */}
      {searchable && (
        <div
          style={{
            ...iconStyles,
            marginRight: 'var(--spacing-2)',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleSearch}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = themeStyles.iconColor;
          }}
        >
          <DynamicIcons
            type="search"
            width={currentSize.iconSize}
            height={currentSize.iconSize}
          />
        </div>
      )}

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={internalValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyles}
        aria-label="Search input"
      />

      {/* Clear Button (Left side in RTL) */}
      {clearable && currentValue && (
        <div
          style={{
            ...iconStyles,
            marginLeft: 'var(--spacing-2)',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleClear}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = themeStyles.iconColor;
          }}
        >
          <DynamicIcons
            type="close"
            width={currentSize.iconSize}
            height={currentSize.iconSize}
            color="currentColor"
          />
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            right: 'var(--spacing-2)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: currentSize.iconSize,
              height: currentSize.iconSize,
              border: `2px solid ${themeStyles.iconColor}`,
              borderTop: `2px solid transparent`,
              borderRadius: '50%',
              animation: 'searchInputSpin 1s linear infinite',
            }}
          />
        </div>
      )}

      {/* CSS Animation for loading spinner */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes searchInputSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};

export default SearchInput; 