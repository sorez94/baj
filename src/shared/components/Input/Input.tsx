'use client';

import React, { forwardRef, useState } from 'react';
import {
  TextField,
  InputAdornment,
  FormHelperText,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LucideIcon } from 'lucide-react';
import type { InputBaseComponentProps } from '@mui/material/InputBase';

// Input Variants
export type InputVariant = 'outlined' | 'filled' | 'standard';

// Input Types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

// Input States
export type InputState = 'default' | 'error' | 'success' | 'warning';

// Allowed inputMode values for inputProps
export type InputModeType = 'text' | 'email' | 'tel' | 'url' | 'search' | 'none' | 'numeric' | 'decimal';

//Allowed DynamicIcons as LeftIcon and RightIcon
type IconComponent =
  | LucideIcon
  | React.ComponentType<{ size?: number; style?: React.CSSProperties; onClick?: () => void }>;

// Input Props Interface
export interface InputProps extends Omit<MuiTextFieldProps, 'variant' | 'size' | 'onChange' | 'multiline'> {
  variant?: InputVariant;
  type?: InputType;
  state?: InputState;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  rightIconColor?: string;
  iconSize?: number;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
  helperText?: string;
  errorText?: string;
  successText?: string;
  warningText?: string;
  isRTL?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  label?: string;
  value?: string | number;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnter?: () => void;
}

// Styled TextField with custom variants and states
const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['customVariant', 'customState'].includes(prop as string)
})<{
  customVariant: InputVariant;
  customState: InputState;
}>(({ theme, customVariant, customState }) => {
  const getVariantStyles = () => {
    switch (customVariant) {
      case 'filled':
        return {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'var(--color-border-disabled)',
            color: 'var(--color-border-disabled)',
            opacity: 1,
          },
          '& .MuiFilledInput-root': {
            backgroundColor: 'var(--color-input-secondary)',
            height: '56px',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit',
            '&:hover': {
              backgroundColor: 'var(--color-input-secondary)',
              borderColor: 'var(--color-primary)',
            },
            '&.Mui-focused': {
              backgroundColor: 'var(--color-input-secondary)',
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-border-disabled)',
              },
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-primary)',
            fontFamily: 'inherit',
            '&.Mui-disabled': {
              color: 'var(--color-border-disabled)',
            },
          },
        };
      case 'standard':
        return {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'var(--color-border-disabled)',
            color: 'var(--color-border-disabled)',
            opacity: 1,
          },
          '& .MuiInput-root': {
            height: '56px',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit',
            '&:hover': {
              backgroundColor: 'var(--color-input-secondary)',
              borderColor: 'var(--color-primary)',
            },
            '&.Mui-focused': {
              backgroundColor: 'var(--color-input-secondary)',
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-border-disabled)',
              },
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-primary)',
            fontFamily: 'inherit',
            '&.Mui-disabled': {
              color: 'var(--color-border-disabled)',
            },
          },
        };
      default: // outlined
        return {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'var(--color-border-disabled)',
            color: 'var(--color-border-disabled)',
            opacity: 1,
          },
          '& .MuiOutlinedInput-root': {
            height: '56px',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-input-border-primary)',
              borderWidth: '1px',
              borderRadius: 'var(--radius-sm)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-primary)',
              fontFamily: 'inherit',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-primary)',
              fontFamily: 'inherit',
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-border-disabled)',
                borderWidth: '1px',
                borderRadius: 'var(--radius-sm)'
              },
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-input-secondary-dark)',
            fontFamily: 'inherit',
            '&.Mui-disabled': {
              color: 'var(--color-border-disabled)',
            },
          },
        };
    }
  };

  const getStateStyles = () => {
    switch (customState) {
      case 'error':
        return {
          '& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInput-root': {
            fontFamily: 'inherit',
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px var(--color-error-alpha)',
              fontFamily: 'inherit',
            },
          },
          '& .MuiInputBase-root. &.MuiOutlinedInput-root': {
            fontFamily: 'inherit',
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px var(--color-error-alpha)',
              fontFamily: 'inherit',
            },
          },
          '& .MuiOutlinedInput-root': {
            fontFamily: 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-error)',
              fontFamily: 'inherit',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-error)',
              fontFamily: 'inherit',
            },
          },
          '& .MuiFilledInput-root': {
            fontFamily: 'inherit',
            '&::after': {
              borderBottom: `2px solid var(--color-error)`,
              fontFamily: 'inherit',
            },
          },
          '& .MuiInput-root': {
            fontFamily: 'inherit',
            '&::after': {
              borderBottom: `2px solid var(--color-error)`,
              fontFamily: 'inherit',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-error)',
            fontFamily: 'inherit',
          },
          '& .MuiInputBase-input': {
            color: 'var(--color-error)',
            fontFamily: 'inherit',
          },
          '& .MuiInputLabel-root.Mui-error': {
            color: 'var(--color-error)',
            fontFamily: 'inherit',            // and this to match specificity
          },
          '& .MuiFormHelperText-root': {
            color: 'var(--color-text-secondary)',
            fontFamily: 'inherit',            // ensure base helper text keeps font
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'var(--color-error)',
            fontFamily: 'inherit',            // ensure error helper text keeps font
          },
        };
      case 'success':
        return {
          '& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInput-root': {
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px var(--color-success-alpha)',
            },
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-success)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-success)',
            },
          },
          '& .MuiFilledInput-root': {
            '&::after': {
              borderBottom: `2px solid var(--color-success)`,
            },
          },
          '& .MuiInput-root': {
            '&::after': {
              borderBottom: `2px solid var(--color-success)`,
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-success)',
          },
          '& .MuiInputBase-input': {
            color: 'var(--color-success)',
          },
        };
      case 'warning':
        return {
          '& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInput-root': {
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px var(--color-warning-alpha)',
            },
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-warning)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-warning)',
            },
          },
          '& .MuiFilledInput-root': {
            '&::after': {
              borderBottom: `2px solid var(--color-warning)`,
            },
          },
          '& .MuiInput-root': {
            '&::after': {
              borderBottom: `2px solid var(--color-warning)`,
            },
          },
          '& .MuiInputLabel-root': {
            color: 'var(--color-warning)',
          },
          '& .MuiInputBase-input': {
            color: 'var(--color-warning)',
          },
        };
      default:
        return {};
    }
  };

  return {
    // Form helper text
    '& .MuiFormHelperText-root': {
      color: 'var(--color-text-secondary)',
      fontFamily: 'inherit',
      fontSize: 'var(--font-size-sm)',
      marginTop: 'var(--spacing-1)',
      '&.Mui-error': {
        color: 'var(--color-error)',
      },
    },
    
    '& .MuiInputAdornment-root': {
      color: 'var(--color-text-secondary)',
    },
    
    // Variant styles
    ...getVariantStyles(),
    
    // State styles
    ...getStateStyles(),
  };
});

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={{
    width: '20px',
    height: '20px',
    border: '2px solid var(--color-primary)',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }}>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Main Input Component
export const Input = forwardRef<HTMLDivElement, InputProps>(({
                                                               variant = 'outlined',
                                                               type = 'text',
                                                               state = 'default',
                                                               leftIcon: LeftIcon,
                                                               rightIcon: RightIcon,
                                                               rightIconColor,
                                                               iconSize = 20,
                                                               leftIconClick,
                                                               rightIconClick,
                                                               helperText,
                                                               errorText,
                                                               successText,
                                                               warningText,
                                                               isRTL,
                                                               maxLength,
                                                               showCharacterCount = false,
                                                               loading = false,
                                                               disabled = false,
                                                               required = false,
                                                               fullWidth = false,
                                                               placeholder,
                                                               label,
                                                               value,
                                                               onChange,
                                                               onFocus,
                                                               onBlur,
                                                               onEnter,
                                                               inputProps: inputPropsProp,
                                                               ...props
                                                             }, ref) => {
  const [inputValue, setInputValue] = useState(value || '');

  // Determine which helper text to show
  const getHelperText = () => {
    if (errorText) return errorText;
    if (successText) return successText;
    if (warningText) return warningText;
    if (helperText) return helperText;
    if (showCharacterCount && maxLength) {
      const valueStr = String(inputValue);
      return `${valueStr.length}/${maxLength}`;
    }
    return '';
  };

  // Determine the actual state to use
  const getActualState = (): InputState => {
    if (errorText) return 'error';
    if (successText) return 'success';
    if (warningText) return 'warning';
    return state;
  };

  // Handle input change
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  // Handle key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  // Force LTR input direction for certain types
  const forceLTRTypes: InputType[] = ['email', 'url', 'tel', 'number', 'search'];
  const shouldForceLTR = forceLTRTypes.includes(type);
  const inputModeMap: Partial<Record<InputType, InputModeType>> = {
    email: 'email',
    url: 'url',
    tel: 'tel',
    number: 'numeric',
    search: 'search',
  };
  const im = inputModeMap[type];

  const mergedInputProps: InputBaseComponentProps = {
    ...(inputPropsProp as InputBaseComponentProps),
    ...(shouldForceLTR ? { dir: 'ltr' as const } : {}),
    ...(im ? { inputMode: im } : {}),
  };

  const actualState = getActualState();

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      <StyledTextField
        ref={ref}
        customVariant={variant}
        customState={actualState}
        variant={variant}
        size="medium"
        type={type}
        label={label}
        placeholder={placeholder}
        value={value || inputValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        // onKeyPress={handleKeyPress}
        disabled={disabled || loading}
        required={required}
        fullWidth={fullWidth}
        error={actualState === 'error'}
        helperText={getHelperText()}
        inputProps={mergedInputProps}
        InputProps={{
          startAdornment: LeftIcon && (
            <InputAdornment position="start">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <LeftIcon
                  size={iconSize ? iconSize : 20}
                  style={{ cursor: leftIconClick ? 'pointer' : 'default' }}
                  onClick={leftIconClick}
                />
              )}
            </InputAdornment>
          ),
          endAdornment: RightIcon && (
            <InputAdornment position="end">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <RightIcon
                  size={iconSize ? iconSize : 20}
                  style={{ cursor: rightIconClick ? 'pointer' : 'default', color: rightIconColor ? rightIconColor : 'inherit' }}
                  onClick={rightIconClick}
                />
              )}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';