// Typography system for consistent text styling
export const typography = {
  // Font families
  fonts: {
    sans: [
      'Geist',
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    mono: [
      'Geist Mono',
      'JetBrains Mono',
      'Fira Code',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
    display: [
      'Geist',
      'Inter',
      'system-ui',
      'sans-serif',
    ],
  },
  
  // Font sizes
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
  },
  
  // Font weights
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line heights
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Text styles (predefined combinations)
  textStyles: {
    // Display styles
    display: {
      '2xl': {
        fontSize: '72px',
        lineHeight: '1',
        fontWeight: '700',
        letterSpacing: '-0.025em',
      },
      xl: {
        fontSize: '60px',
        lineHeight: '1',
        fontWeight: '700',
        letterSpacing: '-0.025em',
      },
      lg: {
        fontSize: '48px',
        lineHeight: '1',
        fontWeight: '700',
        letterSpacing: '-0.025em',
      },
      md: {
        fontSize: '36px',
        lineHeight: '1.2',
        fontWeight: '700',
        letterSpacing: '-0.025em',
      },
      sm: {
        fontSize: '30px',
        lineHeight: '1.2',
        fontWeight: '600',
        letterSpacing: '-0.025em',
      },
    },
    
    // Heading styles
    heading: {
      h1: {
        fontSize: '36px',
        lineHeight: '1.2',
        fontWeight: '700',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '30px',
        lineHeight: '1.3',
        fontWeight: '600',
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '24px',
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '-0.025em',
      },
      h4: {
        fontSize: '20px',
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '-0.025em',
      },
      h5: {
        fontSize: '18px',
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '-0.025em',
      },
      h6: {
        fontSize: '16px',
        lineHeight: '1.4',
        fontWeight: '600',
        letterSpacing: '-0.025em',
      },
    },
    
    // Body styles
    body: {
      lg: {
        fontSize: '18px',
        lineHeight: '1.6',
        fontWeight: '400',
      },
      base: {
        fontSize: '16px',
        lineHeight: '1.6',
        fontWeight: '400',
      },
      sm: {
        fontSize: '14px',
        lineHeight: '1.5',
        fontWeight: '400',
      },
      xs: {
        fontSize: '12px',
        lineHeight: '1.4',
        fontWeight: '400',
      },
    },
    
    // Label styles
    label: {
      lg: {
        fontSize: '14px',
        lineHeight: '1.4',
        fontWeight: '500',
        letterSpacing: '0.025em',
      },
      base: {
        fontSize: '12px',
        lineHeight: '1.4',
        fontWeight: '500',
        letterSpacing: '0.025em',
      },
      sm: {
        fontSize: '11px',
        lineHeight: '1.4',
        fontWeight: '500',
        letterSpacing: '0.025em',
      },
    },
  },
} as const;

export type FontSize = keyof typeof typography.fontSizes;
export type FontWeight = keyof typeof typography.fontWeights;
export type LineHeight = keyof typeof typography.lineHeights;
export type LetterSpacing = keyof typeof typography.letterSpacing;
export type TextStyle = keyof typeof typography.textStyles; 