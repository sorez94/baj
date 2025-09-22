'use client';

import React from 'react';
import {MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps} from '@mui/material';
import {getFontVariant} from '@/shared/utils/fonts';

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

export interface MenuItemProps extends Omit<MuiMenuItemProps, 'variant'> {
  variant?: TypographyVariant;
  weight?: 'regular' | 'medium';
}

const weightToNumber: Record<NonNullable<MenuItemProps['weight']>, number> = {
  regular: 400,
  medium: 500,
};

export default function MenuItem({
                                   children,
                                   variant = 'bodyMedium',
                                   weight = 'regular',
                                   sx,
                                   ...rest
                                 }: MenuItemProps) {

  // Get the typography variant styles
  const variantStyles = getFontVariant(variant);

  return (
    <MuiMenuItem
      sx={{
        fontFamily: variantStyles.fontFamily,
        fontSize: variantStyles.fontSize,
        lineHeight: variantStyles.lineHeight,
        fontWeight: weightToNumber[weight],
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiMenuItem>
  );
}
