export const fontFamilies = {
  yekan400: 'IRANYekanXFaNum-Regular',
  yekan500: 'IRANYekanXFaNum-Medium',
};

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export const fontSizes = {
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
}; 


const typographyVariants = {
  displayLarge: { fontSize: "57px", lineHeight: "82px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
  displayMedium: { fontSize: "45px", lineHeight: "66px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
  displaySmall: { fontSize: "36px", lineHeight: "52px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },

  headlineLarge: { fontSize: "32px", lineHeight: "48px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
  headlineMedium: { fontSize: "28px", lineHeight: "42px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
  headlineSmall: { fontSize: "24px", lineHeight: "38px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },

  titleLarge: { fontSize: "22px", lineHeight: "32px", fontWeight: 500, fontFamily: fontFamilies.yekan500 },
  titleMedium: { fontSize: "16px", lineHeight: "28px", fontWeight: 500, fontFamily: fontFamilies.yekan500 },
  titleSmall: { fontSize: "14px", lineHeight: "26px", fontWeight: 500, fontFamily: fontFamilies.yekan500 },

  labelLarge: { fontSize: "14px", lineHeight: "26px", fontWeight: 500, fontFamily: fontFamilies.yekan500 },
  labelMedium: { fontSize: "12px", lineHeight: "24px", fontWeight: 500, fontFamily: fontFamilies.yekan500 },
  labelSmall: { fontSize: "11px", lineHeight: "22px", fontWeight: 500, fontFamily: fontFamilies.yekan500 },

  bodyLarge: { fontSize: "16px", lineHeight: "32px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
  bodyMedium: { fontSize: "14px", lineHeight: "28px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
  bodySmall: { fontSize: "12px", lineHeight: "24px", fontWeight: 400, fontFamily: fontFamilies.yekan400 },
};

  export function getFontVariant(variant: keyof typeof typographyVariants) {
    return typographyVariants[variant] || typographyVariants.bodyMedium;
  }

