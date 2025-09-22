'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Typography, Card, StatusHandler, Button, Chip, Alert, DynamicIcons, SearchInput } from '@/shared/components';
import { getChequeSheetsListThunk, setScreen, previousScreen, clearChequeSheetsListData, internalAddChequeThunk, clearInternalAddChequeData } from '../store/chequeSlice';
import { fontFamilies } from '@/shared/utils';

import { useBackAction } from '@/shared/hooks';

interface ChequeSheet {
  serial: string;
  sayad: string;
  status: boolean;
  status_desc : string;
  seri?: string;
}

const ChequeSheetsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initChequeRequest, addChequebook, getChequeSheetsList, internalAddCheque } = useSelector(
    (state: RootState) => state.cheque.api
  );

  const requestId = initChequeRequest?.data?.data?.request_id;
  const selectedChequebook = addChequebook?.data?.data;
  const chequeSheets = getChequeSheetsList?.data?.data?.cheques || [];
  const chequeInfo = getChequeSheetsList?.data?.data?.info;

  const [selectedSheet, setSelectedSheet] = useState<ChequeSheet | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useBackAction({ 
    actionType: "cheque/previousScreen",
    payload: null
  });

  const handleGetChequeSheetsList = async () => {
    dispatch(clearChequeSheetsListData());
    dispatch(clearInternalAddChequeData());
    if (requestId && selectedChequebook?.from_serial && selectedChequebook?.to_serial) {
      dispatch(
        getChequeSheetsListThunk({
          request_id: requestId,
          from_serial: selectedChequebook.from_serial,
          to_serial: selectedChequebook.to_serial,
        })
      );
    }
  };

  useEffect(() => {
    handleGetChequeSheetsList();
  }, [requestId, selectedChequebook?.from_serial, selectedChequebook?.to_serial, dispatch]);

  const handleSheetSelect = async (sheet: ChequeSheet) => {
    setSelectedSheet(sheet);
    if (!requestId) return;
      const response = await dispatch(
        internalAddChequeThunk({
          request_id: requestId,
          serial: sheet.serial,
          sayad: sheet.sayad,
          issued: sheet.status,
        })
      );
      console.log(response.payload)
      // Navigate to next screen on success
      if(response?.payload?.data?.issued === false){
        dispatch(setScreen('chequeUploadScreen'));
        return
      }
      if(response.payload?.data?.issued === true){
        dispatch(setScreen('chequeScreen'));
        return
      }
  };

  const getStatusVariant = (status: boolean): 'warning' | 'default' => {
    return status ? 'warning' : 'default';
  };

  const getStatusText = (status: boolean) => {
    switch (status) {
      case true:
        return 'ثبت شده';
      case false:
        return 'ثبت نشده';
      default:
        return 'نامشخص';
    }
  };

  if (getChequeSheetsList?.isLoading || internalAddCheque?.isLoading) {
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  if (internalAddCheque?.error) {
    return (
      <StatusHandler
        type="error"
        description={internalAddCheque.error.message || 'مشکلی پیش آمده است.'}
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

  if (getChequeSheetsList.error) {
    return (
      <StatusHandler
        type="error"
        description={getChequeSheetsList.error.message || 'مشکلی پیش آمده است.'}
        onRetry={handleGetChequeSheetsList}
        retryText="تلاش مجدد"
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

  if (!chequeSheets || chequeSheets.length === 0) {
    return (
      <StatusHandler
        type="empty"
        title="برگه‌ چکی یافت نشد"
        description="هیچ برگه‌ چکی برای این دسته چک موجود نیست."
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {/* Search Bar */}
      <SearchInput
        placeholder="جستجو شناسه صیاد"
        value={searchQuery}
        onChange={setSearchQuery}
        // onSearch={(value) => console.log('Searching for:', value)}
        debounceMs={300}
        size="md"
        style={{ marginBottom: 'var(--spacing-4)' }}
      />

      {/* Instructional Text */}
      <Typography variant="bodyMedium" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-2)' }}>
        برگه چک خود را انتخاب کنید.
      </Typography>

      {/* Informational Alert */}
      {chequeInfo && (
        <Alert
          variant="info"
          closable={false}
        >
          {chequeInfo}
        </Alert>
      )}

      {/* Cheque Sheets List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        {chequeSheets
          .filter((sheet: ChequeSheet) =>
            !searchQuery ||
            (sheet.sayad && sheet.sayad.toString().includes(searchQuery))
          )
          .map((sheet: ChequeSheet, index: number) => (
          <Card
            key={index}
            onClick={() => handleSheetSelect(sheet)}
            style={{
              padding: 'var(--spacing-4)',
              border: selectedSheet?.serial === sheet.serial ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-4)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="bodySmall" style={{  color: 'var(--color-text-primary)' }}>
                سری / سریال چک
              </Typography>
              <Typography variant="labelLarge"  style={{ color: 'var(--color-text-secondary)' }}>
                {sheet.seri || ''} / {sheet.serial || ''}
              </Typography>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="bodySmall" style={{ color: 'var(--color-text-primary)' }}>
                شناسه صیاد
              </Typography>
              <Typography variant="labelLarge"  style={{ color: 'var(--color-text-secondary)' }}>
                {sheet.sayad || ''}
              </Typography>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="bodySmall" style={{  color: 'var(--color-text-primary)' }}>
                وضعیت
              </Typography>
              <Chip
                variant={getStatusVariant(sheet.status)}
              >
                {sheet.status_desc}
              </Chip>
            </div>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSheetSelect(sheet);
              }}
              variant='outlined'
              fullWidth
            >
              انتخاب برگه
            </Button>
          </Card>
        ))}
          {searchQuery && chequeSheets
          .filter((sheet: ChequeSheet) =>
            !searchQuery ||
            (sheet.sayad && sheet.sayad.toString().includes(searchQuery))
          ) .length === 0 && (
            <StatusHandler
              type="empty"
              title="برگه‌ای با این شناسه صیاد یافت نشد."
              description="لطفا شناسه صیاد را دوباره وارد کنید."
            />
          )
          }

      </div>
    </div>
  );
};

export default ChequeSheetsScreen; 