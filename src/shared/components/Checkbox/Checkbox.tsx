'use client';

import React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
  styled,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { fontFamilies } from '@/shared/utils';
import { Typography, TypographyVariant } from '@/shared/components';

export type CheckboxVariant = 'default' | 'filled' | 'outlined' | 'tonal';
export type CheckboxCustomSize = 'sm' | 'md' | 'lg';

export interface AppCheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  label?: React.ReactNode;
  labelVariant?: TypographyVariant;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  tooltip?: string;
  variant?: CheckboxVariant;
  customSize?: CheckboxCustomSize;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  sx?: SxProps<Theme>;
  className?: string;
  /** component-level error flag (do not forward to DOM) */
  error?: boolean;
  style?: React.CSSProperties;
}

// NOTE: use a transient prop ($error) so Emotion never forwards it.
const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) =>
    !['variant', 'customSize', 'error', '$error'].includes(prop as string),
})<{
  customSize?: CheckboxCustomSize;
  $error?: boolean;
}>(({ customSize = 'md', $error = false }) => {
  const getVariantStyles = () =>
    $error
      ? {
        color: 'red',
        '&.Mui-checked': { color: 'red' },
      }
      : {
        color: 'var(--color-text-primary)',
        '&.Mui-checked': { color: 'var(--color-primary)' },
      };

  const getSizeStyles = () => {
    switch (customSize) {
      case 'sm':
        return { transform: 'scale(0.85)' };
      case 'lg':
        return { transform: 'scale(1.3)' };
      default:
        return { transform: 'scale(1)' };
    }
  };

  return {
    ...getVariantStyles(),
    ...getSizeStyles(),
    fontFamily: fontFamilies.yekan500,
    transition: 'all 0.2s ease',
    '& .MuiCheckbox-root': { border: 'none' },
    '&.MuiButtonBase-root': { paddingRight: 0 },
  };
});

export const Checkbox: React.FC<AppCheckboxProps> = ({
                                                       label,
                                                       labelVariant = 'bodyMedium',
                                                       helperText,
                                                       errorText = '',
                                                       tooltip,
                                                       checked,
                                                       onChange,
                                                       sx,
                                                       className,
                                                       style,
                                                       ...props
                                                     }) => {
  const hasError = Boolean(errorText);

  // ⛔️ Prevent forwarding `error` down to MuiCheckbox / DOM
  const { error: _error, ...rest } = props;

  const labelElement = label ? (
    <Typography
      sx={{ color: hasError ? 'red' : 'var(--color-text-primary)', margin: 0, padding: 0 }}
      variant={labelVariant}
    >
      {label}
    </Typography>
  ) : null;

  return (
    <FormControl error={hasError} sx={{ m: 0 }}>
      <FormControlLabel
        sx={{ '.MuiFormControlLabel-label': { marginLeft: '11px' } }}
        control={
          <StyledCheckbox
            {...rest}
            checked={checked}
            onChange={onChange}
            sx={sx}
            className={className}
            style={style}
            $error={hasError} // ✅ styling-only, not forwarded to DOM
          />
        }
        label={labelElement}
      />
      {hasError ? (
        <FormHelperText>
          <Typography sx={{ fontSize: '10px', color: 'indianred', margin: 0 }} variant="bodyMedium">
            {errorText}
          </Typography>
        </FormHelperText>
      ) : helperText ? (
        <Typography sx={{ fontSize: '10px', color: 'indianred', margin: 0 }} variant="bodyMedium">
          {helperText}
        </Typography>
      ) : null}
    </FormControl>
  );
};

export default React.memo(Checkbox);
