// Sizing system for consistent spacing and component dimensions
export const sizes = {
  // Spacing scale (4px base unit)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },
  
  // Component sizes
  components: {
    // Button sizes
    button: {
      xs: {
        height: '24px',
        padding: '4px 8px',
        fontSize: '12px',
        borderRadius: '4px',
      },
      sm: {
        height: '32px',
        padding: '6px 12px',
        fontSize: '14px',
        borderRadius: '6px',
      },
      md: {
        height: '40px',
        padding: '8px 16px',
        fontSize: '16px',
        borderRadius: '8px',
      },
      lg: {
        height: '48px',
        padding: '12px 24px',
        fontSize: '18px',
        borderRadius: '10px',
      },
      xl: {
        height: '56px',
        padding: '16px 32px',
        fontSize: '20px',
        borderRadius: '12px',
      },
    },
    
    // Input sizes
    input: {
      xs: {
        height: '24px',
        padding: '4px 8px',
        fontSize: '12px',
        borderRadius: '4px',
      },
      sm: {
        height: '32px',
        padding: '6px 12px',
        fontSize: '14px',
        borderRadius: '6px',
      },
      md: {
        height: '40px',
        padding: '8px 16px',
        fontSize: '16px',
        borderRadius: '8px',
      },
      lg: {
        height: '48px',
        padding: '12px 24px',
        fontSize: '18px',
        borderRadius: '10px',
      },
      xl: {
        height: '56px',
        padding: '16px 32px',
        fontSize: '20px',
        borderRadius: '12px',
      },
    },
    
    // Card sizes
    card: {
      sm: {
        padding: '16px',
        borderRadius: '8px',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      md: {
        padding: '24px',
        borderRadius: '12px',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      lg: {
        padding: '32px',
        borderRadius: '16px',
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  
  // Layout sizes
  layout: {
    // Container max widths
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    // Sidebar widths
    sidebar: {
      sm: '240px',
      md: '280px',
      lg: '320px',
    },
    
    // Header heights
    header: {
      sm: '56px',
      md: '64px',
      lg: '72px',
    },
    
    // Footer heights
    footer: {
      sm: '80px',
      md: '96px',
      lg: '112px',
    },
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

export type SpacingScale = keyof typeof sizes.spacing;
export type ComponentSize = keyof typeof sizes.components.button;
export type LayoutSize = keyof typeof sizes.layout.container; 