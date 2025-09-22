'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  useMediaQuery
} from '@mui/material';
import Header from '../Header/Header';
import { fontFamilies } from '@/shared/utils/fonts';
import { selectContainerMaxWidth, updateContainer } from '@/store/uiSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';

interface MainLayoutProps {
  children: React.ReactNode;
  // Header props
  title?: string;
  hasBack?: boolean;
  hasTitle?: boolean;
  hasLogo?: boolean;
  hasNotif?: boolean;
  hasSupport?: boolean;
  hasLogout?: boolean;
  hasClose?: boolean;
  hasMore?: boolean;
  hasFilter?: boolean;
  hasProfile?: boolean;
  hasThemeToggle?: boolean;
  isHomeHeader?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  onLogout?: () => void;
  onFilter?: () => void;
  onProfile?: () => void;
  onNotifications?: () => void;
  onSupport?: () => void;
  profileImage?: string;
  profileName?: string;
  // Layout props
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showHeader?: boolean;
  containerPadding?: boolean;
}

export default function MainLayout({
  children,
  // Header props
  title,
  hasBack = true,
  hasTitle = true,
  hasLogo = false,
  hasNotif = false,
  hasSupport = true,
  hasLogout = false,
  hasClose = false,
  hasMore = false,
  hasFilter = false,
  hasProfile = false,
  hasThemeToggle = true,
  isHomeHeader = false,
  onBack,
  onClose,
  onLogout,
  onFilter,
  onProfile,
  onNotifications,
  onSupport,
  profileImage,
  profileName,
  // Layout props
  maxWidth = 'md',
  showHeader = true,
  containerPadding = true
}: MainLayoutProps) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  const containerMaxWidth = useSelector(selectContainerMaxWidth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateContainer({ maxWidth: maxWidth }));
  }, [maxWidth]);

  useEffect(() => {
    dispatch(updateContainer({ maxWidth: containerMaxWidth }));
    let sizeValue: string;
    switch (containerMaxWidth) {
      case 'xs':
        sizeValue = '360px';
        break;
      case 'sm':
        sizeValue = '600px';
        break;
      case 'md':
        sizeValue = '900px';
        break;
      case 'lg':
        sizeValue = '1200px';
        break;
      case 'xl':
        sizeValue = '1536px';
        break;
      default:
        sizeValue = '900px';
    }
    document.documentElement.style.setProperty('--container_size', sizeValue);
  }, [containerMaxWidth]);
  
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-background)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: fontFamilies.yekan400,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      {showHeader && (
        <Header
          title={title}
          hasBack={hasBack}
          hasTitle={hasTitle}
          hasLogo={hasLogo}
          hasNotif={hasNotif}
          hasSupport={hasSupport}
          hasLogout={hasLogout}
          hasClose={hasClose}
          hasMore={hasMore}
          hasFilter={hasFilter}
          hasProfile={hasProfile}
          hasThemeToggle={hasThemeToggle}
          isHomeHeader={isHomeHeader}
          onBack={onBack}
          onClose={onClose}
          onLogout={onLogout}
          onFilter={onFilter}
          onProfile={onProfile}
          onNotifications={onNotifications}
          onSupport={onSupport}
          profileImage={profileImage}
          profileName={profileName}
        />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          py: containerPadding ? (isMobile ? 'var(--spacing-4)' : 'var(--spacing-6)') : 0,
          px: containerPadding ? (isMobile ? 'var(--spacing-2)' : 0) : 0
        }}
      >
        <Container 
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
          maxWidth = {maxWidth}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
} 