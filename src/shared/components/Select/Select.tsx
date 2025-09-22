'use client';

import React, { forwardRef } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LucideIcon } from 'lucide-react';
import { getFontVariant } from "@/shared/utils/fonts";

// Appearance (UI) variants for the Select itself
export type SelectAppearance = 'outlined' | 'filled' | 'standard';

// Visual state
export type SelectState = 'default' | 'error' | 'success' | 'warning';

// Derive the typography variant type from your util function
type TypographyVariant = Parameters<typeof getFontVariant>[0];

export interface SelectProps extends Omit<MuiSelectProps, 'variant' | 'size' | 'onChange'> {
  appearance?: SelectAppearance;          // ⟵ renamed from `variant`
  state?: SelectState;
  labelVariant?: TypographyVariant;       // ⟵ new: for label typography
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
  helperText?: string;
  errorText?: string;
  successText?: string;
  warningText?: string;
  isRTL?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  label?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const StyledSelect = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== 'customVariant' && prop !== 'customState',
})<{
  customVariant: SelectAppearance;
  customState: SelectState;
}>(({ customVariant, customState }) => {
  const err = customState === 'error';

  const commonLabelStyles = {
    fontSize: 'var(--font-size-base)',
    fontFamily: 'inherit',
    '&.Mui-disabled': {
      color: 'var(--color-border-disabled) !important', // ⟵ override disabled label to brown
    },
  };

  const variantStyles = (() => {
    switch (customVariant) {
      case 'filled':
        return {
          '& .MuiFilledInput-root': {
            backgroundColor: 'var(--color-input-secondary)',
            height: '56px',
            fontSize: 'var(--font-size-base)',
            color: err ? 'var(--color-input-error)' : 'var(--color-text-primary)',
            fontFamily: 'inherit',
            '&:hover': { backgroundColor: 'var(--color-input-secondary)' },
            '&.Mui-focused': { backgroundColor: 'var(--color-input-secondary)' },
          },
          '& .MuiInputLabel-root': {
            ...commonLabelStyles,
          },
        };
      case 'standard':
        return {
          '& .MuiInput-root': {
            height: '56px',
            fontSize: 'var(--font-size-base)',
            color: err ? 'var(--color-input-error)' : 'var(--color-input-primary)',
            fontFamily: 'inherit',
          },
          '& .MuiInputLabel-root': {
            ...commonLabelStyles,
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
            color: err ? 'var(--color-input-error)' : 'var(--color-text-primary)',
            fontFamily: 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: err ? 'var(--color-input-error)' : 'var(--color-border)',
              borderWidth: '2px',
              borderRadius: 'var(--radius-md)',
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-border-disabled)',
              },
            },
          },
          '& .MuiInputLabel-root': {
            ...commonLabelStyles,
          },
        };
    }
  })();

  const stateStyles =
    customState === 'error'
      ? {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--color-input-error)',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--color-input-error)',
        },
      }
      : {};

  return {
    ...stateStyles,
    ...variantStyles,
  };
});

// Main Select Component
export const Select = forwardRef<HTMLDivElement, SelectProps>(({
                                                                 appearance = 'outlined',          // ⟵ default for UI variant
                                                                 state = 'default',
                                                                 labelVariant = 'bodyMedium',      // ⟵ default for typography
                                                                 leftIcon: LeftIcon,
                                                                 rightIcon: RightIcon,
                                                                 leftIconClick,
                                                                 rightIconClick,
                                                                 helperText,
                                                                 errorText,
                                                                 successText,
                                                                 warningText,
                                                                 isRTL,
                                                                 disabled = false,
                                                                 required = false,
                                                                 fullWidth = false,
                                                                 label,
                                                                 value,
                                                                 defaultValue,
                                                                 onChange,
                                                                 onFocus,
                                                                 onBlur,
                                                                 sx,
                                                                 children,
                                                                 ...muiSelectProps
                                                               }, ref) => {
  const labelStyles = getFontVariant(labelVariant);

  const actualState: SelectState =
    errorText ? 'error' :
      successText ? 'success' :
        warningText ? 'warning' :
          state;

  const computedHelper =
    errorText ?? successText ?? warningText ?? helperText ?? '';

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      <StyledSelect
        ref={ref}
        customVariant={appearance}
        customState={actualState}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
      >
        {label && (
          <InputLabel
            sx={{
              fontFamily: labelStyles.fontFamily,
              fontSize: labelStyles.fontSize,
              lineHeight: labelStyles.lineHeight,
              fontWeight: labelStyles.fontWeight,
              color: "var(--color-border-disabled)",
              zIndex: 10,
              backgroundColor: 'var(--color-background)',
              px: '15px',
              borderRadius: 'var(--radius-md)',
              ...sx,
            }}
          >
            {label}
          </InputLabel>
        )}

        <MuiSelect
          value={value ?? defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)',
              },
            },
          }}
          displayEmpty
          {...muiSelectProps}   // pass remaining MUI Select props here
        >
          {children}
        </MuiSelect>

        {computedHelper && <FormHelperText>{computedHelper}</FormHelperText>}
      </StyledSelect>
    </div>
  );
});

Select.displayName = 'Select';

export default React.memo(Select);
