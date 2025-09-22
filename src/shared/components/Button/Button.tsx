'use client';

import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { fontFamily, SxProps } from '@mui/system';
import { fontFamilies } from '@/shared/utils';
import { ClassNames } from '@emotion/react';

// Button variants matching Material Design 3
export type ButtonVariant = 
  | 'filled'           // Primary filled button
  | 'filled-tonal'     // Secondary tonal button
  | 'outlined'         // Outlined button
  | 'text'             // Text button
  | 'elevated';        // Elevated button with shadow

// Button sizes
export type ButtonSize = 'sm' | 'md' | 'lg';

// Extended button props
export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconColor?: string;
  rightIconColor?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  customVariant?: ButtonVariant;
  style?: React.CSSProperties;
  className ?: any
}



// Styled button with Material Design 3 variants
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => 
    !['variant', 'size', 'loading', 'customVariant', 'leftIcon', 'rightIcon', 'leftIconColor', 'rightIconColor'].includes(prop as string),
})<ButtonProps>(({ theme, customVariant = 'filled', size = 'md', leftIcon, rightIcon, leftIconColor, rightIconColor, children ,className}) => {


    const muiIconStyls = {
      '& .MuiButton-startIcon': {
        color: rightIconColor || 'var(--color-text-secondary)',
        '& svg': {
          color: rightIconColor || 'var(--color-text-secondary)',
        },
      },
      '& .MuiButton-endIcon': {
        color: leftIconColor || 'var(--color-text-secondary)',
        '& svg': {
          color: leftIconColor || 'var(--color-text-secondary)',
        },
      },
    }
    const muiIconHoverStyls = {
      '&:hover': {
        '& .MuiButton-startIcon': {
          color: rightIconColor || 'inherit',
          '& svg': {
            color: rightIconColor || 'inherit',
          },
        },
        '& .MuiButton-endIcon': {
          color: leftIconColor || 'inherit',
          '& svg': {
            color: leftIconColor || 'inherit',
          },
        },

      },
    }


  const getVariantStyles = () => {
    switch (customVariant) {
      case 'filled':
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-button-primary)',
          '&:hover': {
            backgroundColor: 'var(--color-primary-hover)',
            boxShadow: 'var(--shadow-md)',
          },
          '&:focus': {
            // outline: '2px solid var(--color-primary)',
            outlineOffset: '2px',
          },
          '&:disabled': {
            backgroundColor: 'var(--color-disabled)',
            color: 'var(--color-text-disabled)',
          },
        };
      
      case 'filled-tonal':
        return {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-text-button-tertiary)',
          '&:hover': {
            backgroundColor: 'var(--color-secondary-hover)',
            boxShadow: 'var(--shadow-md)',
          },
        //   '&:focus': {
        //     outline: '2px solid var(--color-secondary)',
        //     outlineOffset: '2px',
        //   },
          '&:disabled': {
            backgroundColor: 'var(--color-disabled)',
            color: 'var(--color-text-disabled)',
          },
        };
      
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          border: '1px solid var(--color-border)',
          '&:hover': {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-button-primary)',
            borderColor: 'var(--color-primary)',
            boxShadow: 'var(--shadow-sm)',
          },
        //   '&:focus': {
        //     outline: '2px solid var(--color-primary)',
        //     outlineOffset: '2px',
        //   },
          '&:disabled': {
            borderColor: 'var(--color-disabled)',
            color: 'var(--color-text-disabled)',
          },
        };
      
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          ...muiIconStyls,
          '&:hover': {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-button-primary)',
            boxShadow: 'var(--shadow-sm)',
            ...muiIconHoverStyls,
          },
        //   '&:focus': {
        //     outline: '2px solid var(--color-primary)',
        //     outlineOffset: '2px',
        //   },
          '&:disabled': {
            color: 'var(--color-text-disabled)',
          },
        };
      
      case 'elevated':
        return {
          backgroundColor: 'var(--color-card)',
          color: 'var(--color-primary)',
          boxShadow: 'var(--shadow-md)',
          '&:hover': {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-button-primary)',
            boxShadow: 'var(--shadow-lg)',
          },
            // '&:focus': {
            //     outline: '2px solid var(--color-primary)',
            //     outlineOffset: '2px',
            // },
          '&:disabled': {
            backgroundColor: 'var(--color-card)',
            color: 'var(--color-text-disabled)',
            boxShadow: 'var(--shadow-sm)',
          },
        };
      
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'var(--spacing-2) var(--spacing-4)',
          fontSize: 'var(--font-size-sm)',
          minHeight: 'var(--button-height-sm)',
          borderRadius: 'var(--radius-button)',
        };
      
      case 'md':
        return {
          padding: 'var(--spacing-3) var(--spacing-6)',
          fontSize: 'var(--font-size-base)',
          height: 'var(--button-height-md)',
          borderRadius: 'var(--radius-button)',
        };
      
      case 'lg':
        return {
          padding: 'var(--spacing-4) var(--spacing-8)',
          fontSize: 'var(--font-size-lg)',
          minHeight: 'var(--button-height-lg)',
          borderRadius: 'var(--radius-button)',
        };
      
      default:
        return {};
    }
  };

  return {
    // Base styles
    textTransform: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    
    // Variant styles - call the function to get styles
    ...getVariantStyles(),
    // Size styles - call the function to get styles
    ...getSizeStyles(),

    // Auto-detect icon-only buttons and make them circular
    ...(React.Children.count(children) === 0 && (leftIcon || rightIcon) && {
      borderRadius: '50%',
      width: 'var(--button-height-md)',
      height: 'var(--button-height-md)',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
    
   
  };
});

// Loading spinner component
const LoadingSpinner = styled('div')({
  display: 'inline-block',
  width: '16px',
  height: '16px',
  border: '2px solid currentColor',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginRight: '8px', // Add spacing for RTL
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  // Ensure smooth animation
  willChange: 'transform',
  // Add a subtle shadow for better visibility
  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
});

// Main Button component
export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  leftIconColor,
  rightIconColor,
  fullWidth = false,
  disabled = false,
  children,
  sx,
  style,
  className,
  ...props
}) => {
  // Determine which icon to show based on RTL and loading state
  const startIcon = loading ? <LoadingSpinner /> : rightIcon;
  const endIcon = leftIcon;
  
  // Disable button when loading or disabled
  const isDisabled = disabled || loading;
  
  // Map our variants to Material UI variants
  const muiVariant = variant === 'outlined' ? 'outlined' : 
                    variant === 'text' ? 'text' : undefined;
  
  return (
    <StyledButton
      variant={muiVariant}
      disabled={isDisabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        // Add loading state styles
        ...(loading && {
          cursor: 'not-allowed',
          opacity: 0.8,
        }),
        ...sx,
      }}
      data-variant={variant}
      data-loading={loading}
      // Pass our custom variant to the styled component
      customVariant={variant}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      leftIconColor={leftIconColor}
      rightIconColor={rightIconColor}
      {...props}
      style={{...style,...{fontFamily : fontFamilies.yekan500,minWidth:"fit-content"}}}
      className={className}
    >
      {children}  
    </StyledButton>
  );
};

export default Button; 