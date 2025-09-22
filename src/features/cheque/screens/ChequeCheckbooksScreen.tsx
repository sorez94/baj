'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Typography, Card, StatusHandler, Button, DynamicIcons, Chip } from '@/shared/components';
import { getChequebooksListThunk, setScreen, previousScreen, clearChequebooksListData, addChequebookThunk, clearAddChequebookData } from '../store/chequeSlice';
import { IMAGE_PATHS } from '@/shared/utils';

import { useBackAction } from '@/shared/hooks';

interface Chequebook {
    seri: string;
from_serial: string;
to_serial: string;
  cheque_count: number;
  chequebook_type?: string;
}

const ChequeCheckbooksScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initChequeRequest, chequebooksList, addChequebook } = useSelector((state: RootState) => state.cheque.api);

  const requestId = initChequeRequest?.data?.data?.request_id;
  const chequebooks = chequebooksList?.data?.data?.cheque_books || [];

  useBackAction({ 
      actionType: "cheque/previousScreen",
      payload: null
  });

  const handleGetChequebooksList = async () => {
    dispatch(clearChequebooksListData())
    dispatch(clearAddChequebookData())
    if (requestId) {
      dispatch(getChequebooksListThunk({ "requestId": requestId }));
    }
  }

  useEffect(() => {
    handleGetChequebooksList();
  }, [requestId]);

  const handleChequebookSelect = async (chequebook: Chequebook) => {
    if (!requestId) return;
      const response = await dispatch(addChequebookThunk({ 
        request_id: requestId, 
        from_serial: chequebook.from_serial,
        to_serial: chequebook.to_serial,
        seri: chequebook.seri
      }));
      if(response.payload?.data?.request_id) {
        // dispatch(setScreen("form"));
        dispatch(setScreen("chequeSheetsScreen"));
      }
  };

  if (chequebooksList.isLoading || addChequebook.isLoading) {
    return (
      <StatusHandler
        type="loading"
        // title="در حال دریافت دسته چک‌ها"
      />
    );
  }

  if(addChequebook?.error?.code === "CQMS-10033") {
    return (
      <StatusHandler
        type="empty"
        description={addChequebook.error?.message || 'مشکلی رخ داد'}
        onRetry={() => dispatch(setScreen("chequeStartScreen"))}  // we should think about this again
        retryText="بازگشت"
      />
    );
  }

  // Error handling of addChequebook
  if (addChequebook?.error) {
    return (
      <StatusHandler
        type="error"
        description={addChequebook.error?.message || 'مشکلی رخ داد'}
        onRetry={() => dispatch(previousScreen())}
        retryText="بازگشت"
      />
    );
  }

  // Error handling of chequebooksList
  if (chequebooksList?.error) {
    return (
      <StatusHandler
        type="error"
        description={chequebooksList.error?.message || 'مشکلی رخ داد'}
        onRetry={() => dispatch(previousScreen())}
        retryText="بازگشت"
      />
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      {/* Instruction Text */}
      <Typography 
        variant="bodyMedium" 
        style={{ 
          marginBottom: 'var(--spacing-4)',
        }}
      >
        دسته چک خود را انتخاب کنید
      </Typography>

      {/* Chequebooks List */}
      {chequebooks.length > 0 ? (
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          {chequebooks.map((chequebook: Chequebook, index: number) => (
            <Card 
              key={index} 
              variant="outlined" 
              padding="md"
              style={{ 
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleChequebookSelect(chequebook)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             
                
                {/* Chequebook Type */}
                <Typography variant="titleMedium" >
                  {chequebook.chequebook_type || 'دسته چک صیادی'}
                </Typography>

                {/* Chevron Icon */}
                <DynamicIcons 
                  type="chevron_left"
                  width={20} 
                  height={20}
                  color="var(--color-text-secondary)"
                />
              </div>

              {/* Separator Line */}
              <div style={{ 
                height: '1px', 
                backgroundColor: 'var(--color-border)', 
                margin: 'var(--spacing-3) 0' 
              }} />

              {/* Chequebook Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' ,display:"flex",flexDirection:"column" }}>
                  <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                    سری چک
                  </Typography>
                  <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                    سریال چک
                  </Typography>
                  <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)' }}>
                    تعداد برگه ها
                  </Typography>
                </div>
                
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <Typography variant="labelLarge"  style={{ marginBottom: 'var(--spacing-1)' }}>
                    {chequebook.seri || ''}
                  </Typography>
                  <Typography variant="labelLarge"  style={{  marginBottom: 'var(--spacing-1)' }}>
                    از {chequebook.from_serial || ''} تا {chequebook.to_serial || ''}
                  </Typography>
                  <Chip variant='info' size='sm'>
                    {chequebook.cheque_count || ''} برگی
                  </Chip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <StatusHandler
          type="empty"
          title="دسته چکی یافت نشد"
          description="هیچ دسته چکی برای انتخاب موجود نیست"
        />
      )}

    </div>
  );
};

export default ChequeCheckbooksScreen; 