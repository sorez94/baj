'use client';

import React, { useEffect, useState } from 'react';
import { Typography, DynamicIcons, StatusHandler , Button} from '@/shared/components';
import styles from './ImagePreview.module.scss';

export interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  // Optional async loader returning object URL
  srcLoader?: () => Promise<string>;
  title?: string;
  alt?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  isOpen,
  onClose,
  imageUrl,
  srcLoader,
  title = 'تصویر',
  alt = 'Image preview'
}) => {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Resolve image source (direct url or via loader)
  useEffect(() => {
    let revokeUrl: string | null = null;
    if (!isOpen) return;
    setError(null);
    if (imageUrl) {
      setSrc(imageUrl);
      return;
    }
    if (!srcLoader) return;
    setLoading(true);
    srcLoader()
      .then((url) => {
        setSrc(url);
        revokeUrl = url;
      })
      .catch((e: any) => setError(e?.message || 'خطا در بارگذاری تصویر'))
      .finally(() => setLoading(false));
    return () => {
      if (revokeUrl) {
        try { URL.revokeObjectURL(revokeUrl); } catch {}
      }
    };
  }, [isOpen, imageUrl, srcLoader]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header - close (left), centered title, back (right) */}
        <div className={styles.header}>
          <Button variant="text" rightIcon={<DynamicIcons type="arrow_forward" style = {{color:"inherit"}} />} onClick={onClose} />
          <Typography variant="titleLarge">{title}</Typography>
        </div>

        {/* Image Container */}
        <div className={styles.imageContainer}>
          {loading && (
              <StatusHandler type="loading" description="در حال بارگذاری تصویر" />
          )}
          {!loading && error && (
              <StatusHandler type="error" description={error} />
          )}
          {!loading && !error && src && (
            <img
              src={src}
              alt={alt}
              className={styles.image}
              onError={() => setError('خطا در نمایش تصویر')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
