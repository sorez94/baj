// Image path constants for consistent usage across the project
export const IMAGE_PATHS = {
  // Logos
  LOGOS: {
    BAJET: {
      PRIMARY: '/assets/images/logos/bajet/primary-logo.png',
      WHITE: '/assets/images/logos/bajet/logo-white.png',
      FAVICON: '/assets/images/logos/bajet/favicon.ico',
    },
    BANKS: {
      OTHERBANK : '/assets/images/logos/banks/otherBank-logo.svg',
      TEJARAT: '/assets/images/logos/banks/tejarat-logo.svg',
      MELI: '/assets/images/logos/banks/meli.png',
      PARSIAN: '/assets/images/logos/banks/parsian.png',
      MELAT: '/assets/images/logos/banks/melat.png',
      SADERAT: '/assets/images/logos/banks/saderat.png',
      KESHAVARZI: '/assets/images/logos/banks/keshavarzi.png',
      MASKAN: '/assets/images/logos/banks/maskan.png',
      POST_BANK: '/assets/images/logos/banks/post-bank.png',
    },
    PARTNERS: {
      // Add partner logos here
    },
  },
  
  // Cards
  CARDS: {
    WALLET: {
      BAJET: '/assets/images/cards/wallet-cards/bajet-card.png',
      WALLET: '/assets/images/cards/wallet-cards/wallet-card.png',
    },
    CREDIT: {
      // Add credit card images here
    },
    DEBIT: {
      // Add debit card images here
    },
  },
  
  // Icons
  ICONS: {
    UI: {
      // Add UI icons here
      SEARCH : '/assets/images/icons/ui/search.svg',
      INFO : '/assets/images/icons/ui/info.svg',
      SUCCESS : '/assets/images/icons/ui/success.svg',
      WARNING : '/assets/images/icons/ui/warning.svg',
      ERROR : '/assets/images/icons/ui/error.svg',
      CHECK : '/assets/images/icons/ui/check.svg',
    },
    FEATURES: {
      // Add feature-specific icons here
    },
    NAVIGATION: {
      // Add navigation icons here
    },
  },
  
  // Backgrounds
  BACKGROUNDS: {
    PATTERNS: {
      // Add pattern images here
    },
    GRADIENTS: {
      // Add gradient images here
    },
  },
  
  // Other
  AVATARS: {
    DEFAULT: '/assets/images/avatars/default-avatar.png',
    PLACEHOLDER: '/assets/images/avatars/placeholder.png',
  },
  
  BANNERS: {
    // Add banner images here
  },
  
  ILLUSTRATIONS: {
    // Add illustration images here
  },

  FEATUERS : {
    CHEQUE : {
      CHEQUE_ERROR : '/assets/images/icons/features/cheque/emptyCheque.svg',
      UNDEFINED : '/assets/images/icons/ui/undefined.svg',
    }
  }
} as const;

// Helper function to get image path
export const getImagePath = (path: string): string => {
  return path;
};

// Helper function to get bank logo by name
export const getBankLogo = (bankName: string): string => {
  const bankKey = bankName.toLowerCase().replace(/\s+/g, '_') as keyof typeof IMAGE_PATHS.LOGOS.BANKS;
  return IMAGE_PATHS.LOGOS.BANKS[bankKey] || IMAGE_PATHS.LOGOS.BANKS.TEJARAT; // Default fallback
};

// Helper function to get card image by type
export const getCardImage = (cardType: 'wallet' | 'credit' | 'debit', cardName: string): string => {
  if (cardType === 'wallet') {
    const cardKey = cardName.toLowerCase().replace(/\s+/g, '_') as keyof typeof IMAGE_PATHS.CARDS.WALLET;
    return IMAGE_PATHS.CARDS.WALLET[cardKey] || IMAGE_PATHS.CARDS.WALLET.BAJET;
  }
  // For credit and debit cards, return default for now
  return IMAGE_PATHS.CARDS.WALLET.BAJET;
}; 