'use client';

import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';
import {getFontVariant } from '@/shared/utils/fonts';

export type TypographyVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall';

export interface TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  variant?: TypographyVariant;
  weight?: 'regular' | 'medium' ;
}

const weightToNumber: Record<NonNullable<TypographyProps['weight']>, number> = {
  regular: 400,
  medium: 500,
};

// Map our custom variants to Material-UI variants for semantic HTML
const variantMap: Partial<Record<TypographyVariant, MuiTypographyProps['variant']>> = {
  displayLarge: 'h1',
  displayMedium: 'h1',
  displaySmall: 'h2',
  headlineLarge: 'h2',
  headlineMedium: 'h3',
  headlineSmall: 'h4',
  titleLarge: 'h5',
  titleMedium: 'h6',
  titleSmall: 'subtitle1',
  labelLarge: 'subtitle2',
  labelMedium: 'subtitle2',
  labelSmall: 'caption',
  bodyLarge: 'body1',
  bodyMedium: 'body2',
  bodySmall: 'caption',
};

export default function Typography({
  children,
  variant = 'bodyMedium',
  weight = 'regular',
  sx,
  ...rest
}: TypographyProps) {

  // Get the typography variant styles
  const variantStyles = getFontVariant(variant);
  
  return (
    <MuiTypography
      variant={variantMap[variant]}
      sx={{
        fontFamily: variantStyles.fontFamily,
        fontSize: variantStyles.fontSize,
        lineHeight: variantStyles.lineHeight,
        fontWeight: variantStyles.fontWeight,
        ...sx,
      }}
     
      {...rest}
      style={{
        color: 'var(--color-text-primary)',
        ...rest.style
      }}
    >
      {children}
    </MuiTypography>
  );
} 