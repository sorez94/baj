'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Receipt as ReceiptIcon } from '@mui/icons-material';
import { MainLayout, Typography } from '@/shared/components';
import { fontFamilies } from '@/shared/utils/fonts';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <MainLayout
      hasLogo={true}
      hasNotif={true}
      hasSupport={true}
      hasProfile={true}
      hasThemeToggle={true}
      isHomeHeader={true}
      hasBack={false}
      hasTitle={false}
      containerPadding={false}
    >
      <Box sx={{ 
        py: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }, 
        px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
        maxWidth: '1400px',
        mx: 'auto'
      }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }, 
            textAlign: 'center',
            borderRadius: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
            border: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background decorative elements */}
          <Box sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
            zIndex: 0
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
            zIndex: 0
          }} />

          {/* Hero Section with Image */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            gap: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
            mb: { xs: 4, sm: 5, md: 6, lg: 8, xl: 10 },
            position: 'relative',
            zIndex: 1
          }}>
            {/* Text Content */}
            <Box sx={{ 
              flex: 1, 
              textAlign: { xs: 'center', lg: 'left' },
              order: { xs: 2, lg: 1 },
              maxWidth: { xs: '100%', lg: '50%' }
            }}>
              <Typography 
                variant={isMobile ? 'headlineSmall' : isTablet ? 'headlineMedium' : isDesktop ? 'headlineLarge' : 'displayMedium'}
                component="h1" 
                weight="medium"
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 4 }, 
                  color: 'var(--color-primary)',
                  lineHeight: 1.2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem', xl: '4rem' }
                }}
              >
            باجت
              </Typography>
              
              <Typography 
                variant={isMobile ? 'titleMedium' : isTablet ? 'titleLarge' : 'headlineSmall'}
                weight="medium"
                sx={{ 
                  mb: { xs: 3, sm: 4, md: 5 }, 
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.4,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem' }
                }}
              >
            بانک دیجیتال شما
              </Typography>

              <Typography 
                variant='bodyLarge'
                sx={{ 
                  mb: { xs: 3, sm: 4, md: 5, lg: 6 }, 
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: { xs: '100%', md: '500px', lg: '600px' },
                  mx: { xs: 'auto', lg: 0 },
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }
                }}
              >
                مدیریت هوشمند چک‌ها، پرداخت‌ها و خدمات بانکی در یک اپلیکیشن
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 2, sm: 3, md: 4 }, 
                justifyContent: { xs: 'center', lg: 'flex-start' }, 
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <Button
                  component={Link}
                  href="/cheque"
                  variant="contained"
                  size="large"
                  startIcon={<ReceiptIcon />}
                  sx={{
                    borderRadius: { xs: 2, sm: 3, md: 4 },
                    textTransform: 'none',
                    fontWeight: 600,
                    px: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
                    py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                    fontFamily: fontFamilies.yekan500,
                    minWidth: { xs: '200px', sm: 'auto' },
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  مدیریت چک‌ها
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: { xs: 2, sm: 3, md: 4 },
                    textTransform: 'none',
                    fontWeight: 600,
                    px: { xs: 3, sm: 4, md: 5, lg: 6, xl: 8 },
                    py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                    fontFamily: fontFamilies.yekan500,
                    minWidth: { xs: '200px', sm: 'auto' },
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '3px',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  سایر خدمات
                </Button>
              </Box>
            </Box>

            {/* Image Section */}
            <Box sx={{ 
              flex: 1,
              order: { xs: 1, lg: 2 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Main Hero Image */}
              <Box sx={{
                position: 'relative',
                width: { xs: '200px', sm: '250px', md: '300px', lg: '350px', xl: '400px' },
                height: { xs: '200px', sm: '250px', md: '300px', lg: '350px', xl: '400px' },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: '4px solid white',
                zIndex: 2
              }}>
                <Image
                  src="/assets/images/logos/bajet/bajet-logo.png"
                  alt="باجت - بانک دیجیتال"
                  width={200}
                  height={200}
                  style={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain'
                  }}
                />
              </Box>

              {/* Floating Cards */}
              <Box sx={{
                position: 'absolute',
                top: { xs: -20, sm: -30, md: -40, lg: -50 },
                right: { xs: -20, sm: -30, md: -40, lg: -50 },
                zIndex: 1
              }}>
                <Image
                  src="/assets/images/cards/wallet-cards/wallet-card.png"
                  alt="کارت کیف پول"
                  width={80}
                  height={60}
                  style={{
                    width: '80px',
                    height: '60px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
                  }}
                />
              </Box>

              <Box sx={{
                position: 'absolute',
                bottom: { xs: -20, sm: -30, md: -40, lg: -50 },
                left: { xs: -20, sm: -30, md: -40, lg: -50 },
                zIndex: 1
              }}>
                <Image
                  src="/assets/images/cards/wallet-cards/bajet-card.png"
                  alt="کارت باجت"
                  width={80}
                  height={60}
                  style={{
                    width: '80px',
                    height: '60px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Features Preview - Enhanced for bigger screens */}
          <Box sx={{ 
            mt: { xs: 4, sm: 5, md: 6, lg: 8, xl: 10 },
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: { md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)' },
            gap: { md: 3, lg: 4, xl: 6 },
            textAlign: 'left',
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{ 
              p: { md: 3, lg: 4, xl: 5 }, 
              borderRadius: { md: 3, lg: 4, xl: 5 }, 
              bgcolor: 'primary.light', 
              color: 'primary.contrastText',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <Typography 
                variant='titleMedium'
                weight="medium"
                sx={{ 
                  mb: 1, 
                  fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' }
                }}
              >
                مدیریت چک‌ها
              </Typography>
              <Typography 
                variant='bodyMedium'
                sx={{ 
                  fontSize: { md: '0.9rem', lg: '1rem', xl: '1.1rem' }
                }}
              >
                ثبت، پیگیری و مدیریت تمام چک‌های خود
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: { md: 3, lg: 4, xl: 5 }, 
              borderRadius: { md: 3, lg: 4, xl: 5 }, 
              bgcolor: 'success.light', 
              color: 'success.contrastText',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <Typography 
                variant='titleMedium'
                weight="medium"
                sx={{ 
                  mb: 1, 
                  fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' }
                }}
              >
                پرداخت‌های امن
              </Typography>
              <Typography 
                variant='bodyMedium'
                sx={{ 
                  fontSize: { md: '0.9rem', lg: '1rem', xl: '1.1rem' }
                }}
              >
                انجام تراکنش‌های مالی با بالاترین سطح امنیت
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: { md: 3, lg: 4, xl: 5 }, 
              borderRadius: { md: 3, lg: 4, xl: 5 }, 
              bgcolor: 'warning.light', 
              color: 'warning.contrastText',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <Typography 
                variant='titleMedium'
                weight="medium"
                sx={{ 
                  mb: 1, 
                  fontSize: { md: '1.1rem', lg: '1.25rem', xl: '1.4rem' }
                }}
              >
                خدمات بانکی
              </Typography>
              <Typography 
                variant='bodyMedium'
                sx={{ 
                  fontSize: { md: '0.9rem', lg: '1rem', xl: '1.1rem' }
                }}
              >
                دسترسی به تمام خدمات بانکی در یک مکان
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}
