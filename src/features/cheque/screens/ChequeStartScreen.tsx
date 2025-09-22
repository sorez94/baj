'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { MainLayout, Typography, Card, DynamicIcons } from '@/shared/components';
import { IMAGE_PATHS } from '@/shared/utils/images';
import { useAppDispatch, useAppSelector } from '@/store';
import { getStepInquiryThunk, initChequeRequestThunk } from '../store';
import { setChequeScreen, setScreen } from '../store/chequeSlice';
import { useBackAction } from '@/shared/hooks/useBackAction';
import {StatusHandler} from '@/shared/components';
import ChequeSayadExternal from "@/features/cheque/screens/ChequeSayadExternal";

export default function ChequeStartScreen() {
  const dispatch = useAppDispatch();

  useBackAction({
    actionType: 'cheque/previousScreen',
    payload: null
  });

  const firstTimeStepInquiry = useRef(true);

  // Redux selectors for getStepInquiry (inline)
  const stepInquiryLoading = useAppSelector((state) => state.cheque.api.getStepInquiry.isLoading);
  const stepInquiryData = useAppSelector((state) => state.cheque.api.getStepInquiry.data);
  const stepInquiryError = useAppSelector((state) => state.cheque.api.getStepInquiry.error);
  
  // Redux selectors for initChequeRequest (inline)
  const initChequeLoading = useAppSelector((state) => state.cheque.api.initChequeRequest.isLoading);
  const initChequeData = useAppSelector((state) => state.cheque.api.initChequeRequest.data);
  const initChequeError = useAppSelector((state) => state.cheque.api.initChequeRequest.error);
  
  const [screenLoading, setScreenLoading] = useState(initChequeData?.data?.request_id ? false : true);

  // Local state for form inputs
  const [requestId, setRequestId] = useState('');

  // Cheque Init form state
  const [initForm, setInitForm] = useState({
    sub_system_id: '101',
    facility_amount: 800000000,
    guarantee_amount: 650000000,
    installment_duration: '20',
    installment_amount: 1000,
    due_date: '1404/10/10'
  });

  const stepHandler = (step: string) => {
    setScreenLoading(false);
    if(step === "UPLOAD") {
      dispatch(setScreen("chequeUploadScreen"))
      dispatch(setChequeScreen("guidance"))
    }
    if(step === "SEND_IMAGE") {
      dispatch(setScreen("chequeUploadScreen"))
      dispatch(setChequeScreen("success"))
    }
  }

  // do not forget for new init we should clear the cheque data
  const autoInitCheque = async () => {
    if(initChequeData?.data?.request_id) {
      setScreenLoading(false);
      return;
    }
    const response = await dispatch(initChequeRequestThunk(initForm));
    if (response.payload?.data?.request_id) {
      const setResponse = await dispatch(getStepInquiryThunk(response.payload?.data?.request_id));
      if(setResponse.payload?.data.step) {
        stepHandler(setResponse.payload?.data.step)
      }
    }
    setScreenLoading(false);
  };
  // Auto-call init service when component mounts
  useEffect(() => {
    if(!firstTimeStepInquiry.current) return;    
    firstTimeStepInquiry.current = false;
    autoInitCheque();
  }, [dispatch, initForm]);


  if(stepInquiryLoading || initChequeLoading || screenLoading) {
    return <StatusHandler type="loading" />
  }
  if(initChequeError || stepInquiryError) {
    return <StatusHandler 
    type="error" 
    description = {initChequeError?.message || stepInquiryError?.message}
    onRetry={() => {
      autoInitCheque();
    }}
     />
  }

  return (
      <div>
                <Typography
                  variant="bodyMedium"
                  style={{
                    marginBottom: 'var(--spacing-6)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.5'
                  }}
                >
                  برای ادامه فرآیند، یکی از روش‌های زیر را انتخاب کنید.
                </Typography>

                {/* Option 1 - Bank Tejarat */}
                <Card 
                  variant="outlined" 
                  padding="md" 
                  onClick={() => dispatch(setScreen('chequeAccountsScreen'))}
                  style={{ marginBottom: 'var(--spacing-4)' }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-4)'
                  }}>
                    {/* Bank Tejarat Logo */}
                    <div style={{
                      width: 'var(--spacing-12)',
                      height: 'var(--spacing-12)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <DynamicIcons type="tejarat_bank" width={40} height={40} style={{width: '100%', height: '100%'}} />
                    </div>

                    {/* Text Content */}
                    <div style={{ flex: 1}}>
                      <Typography variant="titleSmall" style={{ marginBottom: 'var(--spacing-1)' }}>
                        بانک تجارت
                      </Typography>
                      <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)' }}>
                        دارندگان دسته‌چک بانک تجارت
                      </Typography>
                    </div>

                    {/* Arrow Icon */}
                    <div style={{
                      width: 'var(--spacing-6)',
                      height: 'var(--spacing-6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-secondary)'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </div>
                  </div>
                </Card>

                {/* Option 2 - Other Banks */}
                <Card 
                  variant="outlined" 
                  padding="md"
                  onClick={() => dispatch(setScreen('chequeSayadExternal'))}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-4)'
                  }}>
                    {/* Generic Bank Icon */}
                    <div style={{
                      width: 'var(--spacing-12)',
                      height: 'var(--spacing-12)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <DynamicIcons type="other_bank" width={40} height={40} style={{width: '100%', height: '100%'}} />
                    </div>

                    {/* Text Content */}
                    <div style={{ flex: 1}}>
                      <Typography variant="titleSmall" style={{ marginBottom: 'var(--spacing-1)' }}>
                        بانک‌های دیگر
                      </Typography>
                      <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)' }}>
                        دارندگان دسته‌چک سایر بانک‌ها
                      </Typography>
                    </div>

                    {/* Arrow Icon */}
                    <div style={{
                      width: 'var(--spacing-6)',
                      height: 'var(--spacing-6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-secondary)'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </div>
                  </div>
                </Card>
              </div>
          );
        } 