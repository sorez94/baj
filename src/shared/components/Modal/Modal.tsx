'use client';

import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import {Button} from '../Button';
import { Typography } from '../Typography';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
  icon?: React.ReactNode;
  primaryAction: {
    label?: string;
    onClick: () => void;
  };
  secondaryAction: {
    label?: string;
    onClick: () => void;
  };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  icon,
  primaryAction,
  secondaryAction,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
         <div className={styles.content}>
          {icon &&
            <div className={styles.icon}>
              {icon}
            </div>
          }
        
          {title && ( 
           <Typography variant="titleLarge" className={styles.title}>{title}</Typography>
           )}
           {body && (
           <Typography variant="bodyMedium" className={styles.body}>{body}</Typography>
           )}
         </div>
        <div className={styles.actions}>
          {secondaryAction && (
          <Button
            variant="text"
            className={`${styles.actionButton} ${styles.secondaryAction}`}
            onClick={secondaryAction.onClick}
          >
              {secondaryAction.label || 'انصراف'}
            </Button>
          )}
          {primaryAction && (
          <Button
            variant="text"
            className={`${styles.actionButton} ${styles.primaryAction}`}
            onClick={primaryAction.onClick}
          >
              {primaryAction.label || 'تایید'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
