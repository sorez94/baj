'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Notifications as NotificationsIcon,
  HeadsetMic as SupportIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  FilterAlt as FilterIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import { fontFamilies } from '@/shared/utils/fonts';
import { useTheme as useAppTheme } from '@/shared/theme/useTheme';
import { useAppSelector, useAppDispatch } from '@/store';
import { useWebViewBack } from '@/shared/hooks/useWebViewBack';
import { clearBackAction } from '@/store/uiSlice';
import { useRouter } from 'next/navigation';
import { useWebViewNativeBridge } from '@/shared/hooks/useWebViewNativeBridge';

interface HeaderProps {
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
}

export default function Header({
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
  profileName
}: HeaderProps) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { isDark, toggle } = useAppTheme();

  const { actionType, payload } = useAppSelector((state) => state.ui.back);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleBack: webViewBack } = useWebViewBack({ onBack });
  const { isNativeWebView, closeWebView, openNativeApp, navigateToNative } = useWebViewNativeBridge();

  const handleBack = () => {
    if (actionType) {
      // Handle special native routes
      if (actionType === 'native/close') {
        if (isNativeWebView) {
          closeWebView();
        } else {
          // Fallback for web
          router.push(payload?.fallbackRoute || '/');
        }
      } else if (actionType === 'native/open') {
        if (isNativeWebView) {
          openNativeApp(payload);
        } else {
          // Fallback for web
          router.push(payload?.fallbackRoute || '/');
        }
      } else if (actionType === 'native/navigate') {
        if (isNativeWebView) {
          navigateToNative(payload.route, payload.params);
        } else {
          // Fallback for web
          router.push(payload?.fallbackRoute || payload.route);
        }
      }
      // Handle route navigation
      else if (actionType === 'router/push') {
        router.push(payload);
      } else if (actionType === 'router/replace') {
        router.replace(payload);
      } else {
        // Handle Redux action
        dispatch({ type: actionType, payload });
      }
      dispatch(clearBackAction());
    } else {
      webViewBack();
    }
  };

  const handleSupport = () => {



    if (onSupport) {
      onSupport();
    } else {
      // Default support behavior - open phone dialer
      window.open('tel:02125961300', '_self');
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'var(--color-background)',
        // borderBottom: `1px solid var(--color-border)`,
        color: 'var(--color-text-primary)',
        height: 'var(--spacing-16)'
      }}
    >
      <Toolbar sx={{ 
        minHeight: 'var(--spacing-16)', 
        px: 'var(--spacing-4)',
        gap: 'var(--spacing-2)'
      }}>
        {/* Left Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: 1,
          gap: 'var(--spacing-2)'
        }}>
          {/* Back Button */}
          {hasBack && (
            <IconButton
              edge="start"
              onClick={handleBack}
              sx={{
                color: 'var(--color-text-primary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}

          {/* Logo */}
          {hasLogo && (
            <Box sx={{ mr: 'var(--spacing-2)' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-primary)',
                  fontFamily: fontFamilies.yekan500
                }}
              >
                باجت
              </Typography>
            </Box>
          )}

          {/* Title */}
          {hasTitle && title && (
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 'var(--font-weight-normal)',
                fontSize: 'var(--font-size-xl)',
                lineHeight: '28px',
                color: 'var(--color-text-primary)',
                fontFamily: fontFamilies.yekan400
              }}
            >
              {title}
            </Typography>
          )}
        </Box>

        {/* Right Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-2)'
        }}>
          {/* Theme Toggle */}
          {hasThemeToggle && (
            <IconButton
              onClick={toggle}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          )}

          {/* Notifications */}
          {hasNotif && (
            <IconButton
              onClick={onNotifications}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              <NotificationsIcon />
            </IconButton>
          )}

          {/* Filter */}
          {hasFilter && (
            <IconButton
              onClick={onFilter}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              <FilterIcon />
            </IconButton>
          )}

          {/* Support */}
          {hasSupport && (
            <IconButton
              onClick={handleSupport}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              <SupportIcon />
            </IconButton>
          )}

          {/* Logout */}
          {hasLogout && (
            <IconButton
              onClick={onLogout}
              sx={{
                color: 'var(--color-error)',
                '&:hover': {
                  backgroundColor: 'var(--color-error-alpha)',
                  color: 'var(--color-error)'
                }
              }}
            >
              <LogoutIcon />
            </IconButton>
          )}

          {/* Close */}
          {hasClose && (
            <IconButton
              onClick={onClose}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

          {/* More Options */}
          {hasMore && (
            <IconButton
              onClick={onBack}
              sx={{
                color: 'var(--color-text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-text-button-tertiary)'
                }
              }}
            >
              <MoreVertIcon />
            </IconButton>
          )}

          {/* Profile */}
          {hasProfile && (
            <IconButton
              onClick={onProfile}
              sx={{
                p: 'var(--spacing-1)',
                '&:hover': {
                  backgroundColor: 'var(--color-secondary)'
                }
              }}
            >
              <Avatar
                src={profileImage}
                sx={{
                  width: 'var(--spacing-8)',
                  height: 'var(--spacing-8)',
                  bgcolor: 'var(--color-secondary)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-button-tertiary)'
                }}
              >
                {profileName ? profileName.charAt(0) : <PersonIcon />}
              </Avatar>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 