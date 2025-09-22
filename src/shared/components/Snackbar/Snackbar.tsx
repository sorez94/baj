'use client';

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {Snackbar as MuiSnackbar, Alert as MuiAlert, useMediaQuery, useTheme} from '@mui/material';
import {Select, Typography} from "@/shared/components";

type SnackbarVariant = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarProps {
  open: boolean;
  message: string;
  variant?: SnackbarVariant;
  autoHideDuration?: number;
  onClose?: () => void;

  // Customization
  textColor?: string;
  textSize?: string | number;
  textWeight?: number;
  boxBgColor?: string;
  boxBorderColor?: string;
  boxPadding?: string | number;
}

const getVariantStyles = (variant: SnackbarVariant) => {
  switch (variant) {
    case 'success':
      return {
        boxBgColor: '#4caf50',  // Green
        boxBorderColor: '#388e3c',
        textColor: '#ffffff',
      };
    case 'error':
      return {
        boxBgColor: "var(--color-snackbar-background)",  // Gray
        boxBorderColor: '#303133',
        textColor: 'textSecondary',
      };
    case 'warning':
      return {
        boxBgColor: '#ff9800',  // Orange
        boxBorderColor: '#f57c00',
        textColor: '#ffffff',
      };
    case 'info':
      return {
        boxBgColor: '#2196f3',  // Blue
        boxBorderColor: '#1976d2',
        textColor: '#ffffff',
      };
    default:
      return {
        boxBgColor: "var(--color-snackbar-background)",  // Neutral Gray
        boxBorderColor: '#303133',
        textColor: 'textSecondary',
      };
  }
};

const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) =>
    !['boxBgColor', 'boxBorderColor', 'boxPadding'].includes(prop as string),
})<{
  boxBgColor?: string;
  boxBorderColor?: string;
  boxPadding?: string | number;
}>(({boxBgColor, boxBorderColor, boxPadding, theme}) => ({
  borderRadius: '12px',
  alignItems: 'center',
  fontSize: '0.9rem',
  fontWeight: 500,
  backgroundColor: boxBgColor || 'inherit',
  border: boxBorderColor ? `1px solid ${boxBorderColor}` : 'none',
  padding: boxPadding || theme.spacing(1.5, 2),
}));

export const Snackbar: React.FC<SnackbarProps> = ({
                                             open,
                                             message,
                                             variant = 'error',
                                             autoHideDuration = 4000,
                                             onClose,
                                             textColor,
                                             boxBgColor,
                                             boxBorderColor,
                                             boxPadding,
                                           }) => {
  const { boxBgColor: variantBgColor, boxBorderColor: variantBorderColor, textColor: variantTextColor } = getVariantStyles(variant);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      sx={{width: isMobile ? '100%' : 'var(--container_size)', left: 0, right: 0}}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <StyledAlert
        sx={{ width: isMobile ? '100%' : 'var(--container_size)', margin: '12px 16px', borderRadius: '5px' }}
        onClose={onClose}
        severity={variant}
        variant="filled"
        icon={false}
        boxBgColor={boxBgColor || variantBgColor}
        boxBorderColor={boxBorderColor || variantBorderColor}
        boxPadding={boxPadding || '8px 8px'}
      >
        <Typography
          variant="bodyMedium"
          sx={{
            color: textColor || variantTextColor,
          }}
        >
          {message}
        </Typography>
      </StyledAlert>
    </MuiSnackbar>
  );
};

Snackbar.displayName = 'Snackbar';

export default React.memo(Snackbar);
