# Images Directory Structure

This directory contains all images, logos, and visual assets for the Bajet PWA project.

## 📁 Folder Structure

```
images/
├── logos/           # All logo files
│   ├── bajet/      # Bajet brand logos
│   ├── banks/      # Bank logos (Tejarat, Meli, etc.)
│   └── partners/   # Partner company logos
├── icons/          # Icon files
│   ├── ui/         # UI interface icons
│   ├── features/   # Feature-specific icons
│   └── navigation/ # Navigation icons
├── cards/          # Card-related images
│   ├── credit-cards/   # Credit card images
│   ├── debit-cards/    # Debit card images
│   └── wallet-cards/   # Wallet card images
├── backgrounds/    # Background images
│   ├── patterns/   # Pattern backgrounds
│   └── gradients/  # Gradient backgrounds
├── avatars/        # User avatar images
├── banners/        # Banner/promotional images
└── illustrations/  # Illustration images
```

## 🎯 Usage Guidelines

### 1. **File Naming Convention**
- Use lowercase with hyphens: `bank-tejarat-logo.png`
- Be descriptive: `primary-logo-blue.png` not `logo1.png`
- Include dimensions if relevant: `hero-image-1200x600.jpg`

### 2. **Image Formats**
- **PNG**: For logos, icons, and images requiring transparency
- **JPG/JPEG**: For photographs and complex images
- **SVG**: For scalable icons and simple graphics
- **WebP**: For modern browsers (with fallbacks)

### 3. **Image Optimization**
- Compress images before adding to the project
- Use appropriate sizes (don't use 2000px images for thumbnails)
- Consider using Next.js Image component for automatic optimization

### 4. **Accessibility**
- Always include `alt` text for images
- Use descriptive alt text for screen readers
- Decorative images should have empty alt text: `alt=""`

## 🔧 Implementation

### Using Image Paths
```typescript
import { IMAGE_PATHS, getBankLogo } from '@/shared/utils/images';

// Direct path usage
<img src={IMAGE_PATHS.LOGOS.BANKS.TEJARAT} alt="Bank Tejarat" />

// Dynamic bank logo
<img src={getBankLogo('Bank Tejarat')} alt="Bank Logo" />

// Card images
<img src={IMAGE_PATHS.CARDS.WALLET.BAJET} alt="Bajet Card" />
```

### Next.js Image Component
```typescript
import Image from 'next/image';
import { IMAGE_PATHS } from '@/shared/utils/images';

<Image
  src={IMAGE_PATHS.LOGOS.BANKS.TEJARAT}
  alt="Bank Tejarat Logo"
  width={48}
  height={48}
/>
```

## 📱 Responsive Images

For responsive images, consider providing multiple sizes:
```
logos/
├── bajet/
│   ├── primary-logo-small.png    (32x32)
│   ├── primary-logo-medium.png   (64x64)
│   └── primary-logo-large.png    (128x128)
```

## 🚀 Best Practices

1. **Keep it organized**: Always put images in the appropriate folder
2. **Optimize**: Compress images to reduce bundle size
3. **Consistent naming**: Follow the naming convention strictly
4. **Version control**: Don't commit unnecessarily large images
5. **Documentation**: Update this README when adding new image types

## 📋 Adding New Images

1. Choose the appropriate folder based on image type
2. Follow the naming convention
3. Optimize the image (compress, resize if needed)
4. Update the `IMAGE_PATHS` constant in `src/shared/utils/images.ts`
5. Use the image in your component with proper alt text 