'use client';

import React from 'react';
import { Typography } from '@/shared/components';
import styles from './UploadProgress.module.scss';

export interface UploadProgressProps {
  progress: number;
  isUploading: boolean;
  fileName?: string;
  fileSize?: string;
  className?: string;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  isUploading,
  fileName,
  fileSize,
  className
}) => {
  if (!isUploading && progress === 0) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <Typography variant="bodyMedium" className={styles.title}>
          در حال آپلود...
        </Typography>
        <Typography variant="bodySmall" className={styles.percentage}>
          {progress}%
        </Typography>
      </div>
      
      {fileName && (
        <Typography variant="bodySmall" className={styles.fileInfo}>
          {fileName}
          {fileSize && ` (${fileSize})`}
        </Typography>
      )}
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;

