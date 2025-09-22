'use client';

import React from 'react';
import Image from 'next/image';
import {IMAGE_PATHS} from '@/shared/utils';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// Import SVG icons as React components
import ChevronLeftIcon from '../../../../public/assets/images/icons/ui/chevron_left.svg';
import SearchIcon from '../../../../public/assets/images/icons/ui/search.svg';

import AddImageIcon from '../../../../public/assets/images/icons/ui/add_image.svg';
import BrokenImageIcon from '../../../../public/assets/images/icons/ui/broken_image.svg';
import MoreVert from '../../../../public/assets/images/icons/ui/more_vert.svg'
import Visibility from '../../../../public/assets/images/icons/ui/visibility.svg';
import ArrowForward from '../../../../public/assets/images/icons/ui/arrow_forward.svg';
import ReloadIcon from '../../../../public/assets/images/icons/ui/reload.svg';
import ArrowUploadProgressIcon from '../../../../public/assets/images/icons/ui/arrow_upload_progress.svg';
import VideocamIcon from '../../../../public/assets/images/icons/ui/videocam.svg';

import CalendarIcon from '../../../../public/assets/images/icons/ui/calendar.svg';
import RialIcon from '../../../../public/assets/images/icons/ui/rial.svg';
import CopyIcon from '../../../../public/assets/images/icons/ui/copy.svg';
import WarningIcon from '../../../../public/assets/images/icons/ui/warning.svg';
import UndefinedIcon from '../../../../public/assets/images/icons/ui/undefined.svg';
import BarcodeIcon from '../../../../public/assets/images/icons/ui/barcode.svg';

// Create a simple close icon component since we don't have the SVG
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Define all available icon types
export type IconType =
  // UI Icons
  | 'chevron_left'
  | 'chevron_right'
  | 'arrow_forward'
  | 'close'
  | 'check'
  | 'plus'
  | 'minus'
  | 'search'
  | 'info'
  | 'add_image'
  | 'broken_image'
  | 'jpg'
  | 'more_vert'
  | 'visibility'
  | 'reload'
  | 'arrow_upload_progress'
  | 'videocam'
  | 'undefined'
  | 'barcode'

  | 'calendar'
  | 'rial'
  | 'copy'
  | 'warning'

  // Status Icons
  | 'error_status'
  | 'success_status'
  | 'error_image1'
  | 'empty_box'
  
  // Navigation Icons
  | 'back'
  | 'forward'
  | 'home'
  | 'menu'
  
  // Feature Icons
  | 'bank_logo'
  | 'chequebook'
  | 'document'
  | 'upload'

  // Action Icons
  | 'edit'
  | 'delete'
  | 'download'
  | 'share'
  
  // Bank Icons
  | 'other_bank'
  | 'tejarat_bank'
  | 'melli_bank'
  | 'parsian_bank'
  | 'saman_bank';

// Icon configuration with paths, default sizes, and SVG component info
interface IconConfig {
  path: string;
  width: number;
  height: number;
  alt?: string;
  isSvg?: boolean;
  svgComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isMaterialUI?: boolean;
  materialIcon?: React.ComponentType<any>;
}

// Centralized icon paths and configurations
const ICON_CONFIGS: Record<IconType, IconConfig> = {
  // UI Icons (SVG components)
  chevron_left: {
    path: '/assets/images/icons/ui/chevron_left.svg',
    width: 20,
    height: 20,
    alt: 'Chevron Left',
    isSvg: true,
    svgComponent: ChevronLeftIcon
  },
  search: {
    path: '/assets/images/icons/ui/search.svg',
    width: 20,
    height: 20,
    alt: 'Search',
    isSvg: true,
    svgComponent: SearchIcon
  },
  info: {
    path: '/assets/images/icons/ui/info.svg',
    width: 24,
    height: 24,
    alt: 'Information',
    isMaterialUI: true,
    materialIcon: InfoOutlinedIcon
  },
  close: {
    path: '/assets/images/icons/ui/close.svg',
    width: 24,
    height: 24,
    alt: 'Close',
    isSvg: true,
    svgComponent: CloseIcon
  },
  add_image: {
    path: '/assets/images/icons/ui/add_image.svg',
    width: 20,
    height: 20,
    alt: 'Add Image',
    isSvg: true,
    svgComponent: AddImageIcon
  },
  broken_image: {
    path: '/assets/images/icons/ui/broken_image.svg',
    width: 24,
    height: 24,
    alt: 'Broken Image',
    isSvg: true,
    svgComponent: BrokenImageIcon
  },
  more_vert: {
    path: '/assets/images/icons/ui/more_vert.svg',
    width: 24,
    height: 24,
    alt: 'more Image',
    isSvg: true,
    svgComponent: MoreVert
  },
  visibility: {
    path: '/assets/images/icons/ui/visibility.svg',
    width: 24,
    height: 24,
    alt: 'Visibility',
    isSvg: true,
    svgComponent: Visibility
  },
  reload: {
    path: '/assets/images/icons/ui/reload.svg',
    width: 24,
    height: 24,
    alt: 'Reload',
    isSvg: true,
    svgComponent: ReloadIcon
  },
  arrow_upload_progress: {
    path: '/assets/images/icons/ui/arrow_upload_progress.svg',
    width: 24,
    height: 24,
    alt: 'Arrow Upload Progress',
    isSvg: true,
    svgComponent: ArrowUploadProgressIcon
  },
  videocam: {
    path: '/assets/images/icons/ui/videocam.svg',
    width: 24,
    height: 24,
    alt: 'Videocam',
    isSvg: true,
    svgComponent: VideocamIcon
  },  calendar: {
    path: '/assets/images/icons/ui/calendar.svg',
    width: 24,
    height: 24,
    alt: 'Calendar',
    isSvg: true,
    svgComponent: CalendarIcon
  },
  rial: {
    path: '/assets/images/icons/ui/rial.svg',
    width: 24,
    height: 24,
    alt: 'Rial',
    isSvg: true,
    svgComponent: RialIcon
  },
  copy: {
    path: '/assets/images/icons/ui/copy.svg',
    width: 24,
    height: 24,
    alt: 'Copy',
    isSvg: true,
    svgComponent: CopyIcon
  },
  warning: {
    path: '/assets/images/icons/ui/warning.svg',
    width: 24,
    height: 24,
    alt: 'Warning',
    isSvg: true,
    svgComponent: WarningIcon
  },
  barcode: {
    path: '/assets/images/icons/ui/barcode.svg',
    width: 24,
    height: 24,
    alt: 'Warning',
    isSvg: true,
    svgComponent: BarcodeIcon
  },
  undefined: {
    path: '/assets/images/icons/ui/undefined.svg',
    width: 24,
    height: 24,
    alt: 'Undefined',
    isSvg: true,
    svgComponent: UndefinedIcon
  },

  // Other UI Icons (regular images)
  chevron_right: {
    path: '/assets/images/icons/ui/chevron_right.svg',
    width: 20,
    height: 20,
    alt: 'Chevron Right'
  },
  arrow_forward: {
    path: '/assets/images/icons/ui/arrow_forward.svg',
    width: 24,
    height: 24,
    alt: 'Arrow forward',
    isSvg: true,
    svgComponent: ArrowForward
  },
  check: {
    path: '/assets/images/icons/ui/check.svg',
    width: 20,
    height: 20,
    alt: 'Check'
  },
  plus: {
    path: '/assets/images/icons/ui/plus.svg',
    width: 20,
    height: 20,
    alt: 'Plus'
  },
  minus: {
    path: '/assets/images/icons/ui/minus.svg',
    width: 24,
    height: 24,
    alt: 'Minus'
  },
  jpg: {
    path: '/assets/images/icons/ui/jpg.png',
    width: 24,
    height: 24,
    alt: 'JPG'
  },



  // Status Icons
  error_status: {
    path: '/assets/images/icons/components/statusHandler/errorStatus.svg',
    width: 64,
    height: 64,
    alt: 'Error Status'
  },
  success_status: {
    path: '/assets/images/icons/components/statusHandler/successStatus.svg',
    width: 64,
    height: 64,
    alt: 'Success Status'
  },
  error_image1: {
    path: '/assets/images/icons/components/statusHandler/errorImage1.svg',
    width: 180,
    height: 180,
    alt: 'Error Image'
  },
  empty_box: {
    path: '/assets/images/icons/components/statusHandler/emptyBox.svg',
    width: 180,
    height: 180,
    alt: 'Empty Box'
  },

  // Navigation Icons
  back: {
    path: '/assets/images/icons/navigation/back.svg',
    width: 24,
    height: 24,
    alt: 'Back'
  },
  forward: {
    path: '/assets/images/icons/navigation/forward.svg',
    width: 24,
    height: 24,
    alt: 'Forward'
  },
  home: {
    path: '/assets/images/icons/navigation/home.svg',
    width: 24,
    height: 24,
    alt: 'Home'
  },
  menu: {
    path: '/assets/images/icons/navigation/menu.svg',
    width: 24,
    height: 24,
    alt: 'Menu'
  },

  // Feature Icons
  bank_logo: {
    path: '/assets/images/icons/features/bank_logo.svg',
    width: 48,
    height: 48,
    alt: 'Bank Logo'
  },
  chequebook: {
    path: '/assets/images/icons/features/chequebook.svg',
    width: 32,
    height: 32,
    alt: 'Chequebook'
  },
  document: {
    path: '/assets/images/icons/features/document.svg',
    width: 24,
    height: 24,
    alt: 'Document'
  },
  upload: {
    path: '/assets/images/icons/features/upload.svg',
    width: 24,
    height: 24,
    alt: 'Upload'
  },

  // Action Icons
  edit: {
    path: '/assets/images/icons/actions/edit.svg',
    width: 20,
    height: 20,
    alt: 'Edit'
  },
  delete: {
    path: '/assets/images/icons/actions/delete.svg',
    width: 20,
    height: 20,
    alt: 'Delete'
  },
  download: {
    path: '/assets/images/icons/actions/download.svg',
    width: 20,
    height: 20,
    alt: 'Download'
  },
  share: {
    path: '/assets/images/icons/actions/share.svg',
    width: 20,
    height: 20,
    alt: 'Share'
  },

  // Bank Icons
  other_bank: {
    path: IMAGE_PATHS.LOGOS.BANKS.OTHERBANK,
    width: 48,
    height: 48,
    alt: 'Other Bank'
  },
  tejarat_bank: {
    path: IMAGE_PATHS.LOGOS.BANKS.TEJARAT,
    width: 48,
    height: 48,
    alt: 'Tejarat Bank'
  },
  melli_bank: {
    path: '/assets/images/icons/banks/melli.svg',
    width: 48,
    height: 48,
    alt: 'Melli Bank'
  },
  parsian_bank: {
    path: '/assets/images/icons/banks/parsian.svg',
    width: 48,
    height: 48,
    alt: 'Parsian Bank'
  },
  saman_bank: {
    path: '/assets/images/icons/banks/saman.svg',
    width: 48,
    height: 48,
    alt: 'Saman Bank'
  }
};

// Props interface
interface DynamicIconsProps {
  type: IconType;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onClick?: () => void;
  color?: string; // New prop for SVG color
}

const DynamicIcons: React.FC<DynamicIconsProps> = ({
  type,
  width,
  height,
  alt,
  className,
  style,
  priority = false,
  onClick,
  color
}) => {
  const config = ICON_CONFIGS[type];
  
  if (!config) {
    console.warn(`Icon type "${type}" not found in ICON_CONFIGS`);
    return null;
  }

  const finalWidth = width || config.width;
  const finalHeight = height || config.height;
  const finalAlt = alt || config.alt || 'Icon';

  // If it's a Material-UI icon, render it
  if (config.isMaterialUI && config.materialIcon) {
    const MaterialIcon = config.materialIcon;
    const iconStyle = {
      ...style,
      ...(color && { color }),
      ...(onClick && { cursor: 'pointer' }),
      fontSize: `${finalWidth}px`,
      width: finalWidth,
      height: finalHeight
    };

    return (
      <MaterialIcon
        className={className}
        style={iconStyle}
        onClick={onClick}
        aria-label={finalAlt}
      />
    );
  }

  // If it's an SVG component, render it as a React component
  if (config.isSvg && config.svgComponent) {
    const SvgComponent = config.svgComponent;
    const svgStyle = {
      ...style,
      ...(color && { color }),
      ...(onClick && { cursor: 'pointer' })
    };

    return (
      <SvgComponent
        style={{...{color:"var(--color-text-secondary)"},...svgStyle}}
        className={className}
        onClick={onClick}
        aria-label={finalAlt}
      />
    );
  }

  // Otherwise, render as Next.js Image component
  return (
    <Image
      src={config.path}
      alt={finalAlt}
      width={finalWidth}
      height={finalHeight}
      className={className}
      style={style}
      priority={priority}
      onClick={onClick}
      {...(onClick && { style: { ...style, cursor: 'pointer' } })}
    />
  );
};

export default DynamicIcons; 