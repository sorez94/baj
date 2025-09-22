'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './BottomSheet.module.scss';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showHandle?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  showHandle = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when bottom sheet is open
      document.body.style.overflow = 'hidden';
      // Small delay to ensure smooth animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Drag handlers for both mouse and touch
  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    setDragStartY(clientY);
    setDragCurrentY(clientY);
  };

  const handleDragMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const currentY = clientY;
    const deltaY = currentY - dragStartY;
    setDragCurrentY(currentY);
    
    if (bottomSheetRef.current) {
      // Only allow downward movement
      const translateY = Math.max(0, deltaY);
      bottomSheetRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const deltaY = dragCurrentY - dragStartY;
    
    // If dragged down more than 100px, close the bottom sheet
    if (deltaY > 100) {
      onClose();
    } else {
      // Snap back to original position
      if (bottomSheetRef.current) {
        bottomSheetRef.current.style.transform = 'translateY(0)';
      }
    }
    
    setDragStartY(0);
    setDragCurrentY(0);
  };

  // Add global event listeners for dragging (both mouse and touch)
  useEffect(() => {
    if (isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      // Touch events
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      
      return () => {
        // Clean up mouse events
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        
        // Clean up touch events
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, dragStartY, dragCurrentY, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div 
        ref={bottomSheetRef}
        className={`${styles.bottomSheet} ${isVisible ? styles.open : ''} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {showHandle && (
          <div 
            className={styles.handle}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ cursor: 'grab' }}
          />
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
