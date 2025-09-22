'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Typography, Card, StatusHandler, Button, DynamicIcons } from '@/shared/components';
import { getAccountsListThunk, setScreen, addAccountThunk, previousScreen, clearAccountsListData, clearAddAccountData } from '../store/chequeSlice';
import { IMAGE_PATHS } from '@/shared/utils';

import { useBackAction } from '@/shared/hooks';

interface Account {
  account_type: string;
  account_number: string;
  branch_code: string;
  bank_logo?: string;
}

const ChequeAccountsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initChequeRequest, accountsList , addAccount } = useSelector((state: RootState) => state.cheque.api);

  const requestId = initChequeRequest?.data?.data?.request_id;
  const accounts = accountsList?.data?.data?.accounts || [];

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    useBackAction({ 
      actionType: "cheque/previousScreen",
      payload: null
  });

  const handleGetAccountsList = async () => {
    dispatch(clearAddAccountData())
    dispatch(clearAccountsListData())

    if (requestId) {
      dispatch(getAccountsListThunk({ requestId }));
    } 
  }

  useEffect(() => {
    handleGetAccountsList()
  }, [requestId, dispatch]);


  const handleAccountSelect = async (account? : Account) => {
    if(account){
      setSelectedAccount(account);
    }

    if (!requestId) return;
      const response = await dispatch(addAccountThunk({ 
        request_id: requestId, 
        account: account?.account_number || selectedAccount?.account_number || ''
      }))
      if(response.payload?.data?.request_id) {
        dispatch(setScreen("chequeCheckbooksScreen"));
      }
  };

  if (accountsList.isLoading || addAccount.isLoading) {
    return (
      <StatusHandler
        type="loading"
        // description="لطفاً صبر کنید"
      />
    );
  }

    // error handling of addAccount  ------- start ------

    if(addAccount?.error) { 
      return (
        <StatusHandler
          type="error"
          description={addAccount.error?.message || 'مشکلی رخ داد'}
          onConfirm={() => dispatch(previousScreen())}
          confirmText="بازگشت"
          onRetry={addAccount?.error?.retryable ? handleAccountSelect : undefined}
        />
      )
    }
    
   // error handling of addAccount  ------- end ------
   // error handling of accountsList  ------- start ------

  if(accountsList?.error?.code === "CQMS-10004") {
    return (
      <StatusHandler
        type="error"
        image={IMAGE_PATHS.FEATUERS.CHEQUE.CHEQUE_ERROR}
        // title="خطا در دریافت حساب‌ها"
        description={accountsList.error?.message || 'مشکلی رخ داد'}
        onRetry={addAccount?.error?.retryable ? handleGetAccountsList : undefined}
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }
  if (accountsList?.error) {
    return (
      <StatusHandler
        type="error"
        // title="خطا در دریافت حساب‌ها"
        description={accountsList.error?.message || 'مشکلی رخ داد'}
        onRetry={addAccount?.error?.retryable ? handleGetAccountsList : undefined}
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

 // error handling of accountsList  ------- end ------

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      {/* Instruction Text */}
      <Typography 
        variant="bodyMedium" 
        style={{ 
          color: 'var(--color-text-primary)'
        }}
      >
        حساب خود را انتخاب کنید
      </Typography>

      {/* Accounts List */}
      {accounts.length > 0 ? (
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          {accounts.map((account: Account, index: number) => (
            <Card 
              key={index} 
              variant="outlined" 
              padding="md"
              style={{ 
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleAccountSelect(account)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Bank Logo and Account Type */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                  <DynamicIcons type="tejarat_bank" width={48} height={48} />
                  <Typography variant="titleMedium" >
                    {account.account_type || 'حساب جاری'}
                  </Typography>
                </div>
                {/* Chevron Icon */}
                <DynamicIcons type="chevron_left" width={20} height={20} style={{ color: 'var(--color-text-secondary)' }} />
              </div>

              {/* Separator Line */}
              <div style={{ 
                height: '1px', 
                backgroundColor: 'var(--color-border)', 
                margin: 'var(--spacing-3) 0' 
              }} />

              {/* Account Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'right',display:"flex",flexDirection:"column" }}>
                  <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                    شماره حساب
                  </Typography>
                  <Typography variant="bodySmall" style={{ color: 'var(--color-text-secondary)' }}>
                    شعبه
                  </Typography>
                </div>
                
                <div style={{ textAlign: 'left' }}>
                  <Typography variant="labelLarge"  style={{  marginBottom: 'var(--spacing-1)' }}>
                    {account?.account_number}
                  </Typography>
                  <Typography variant="labelLarge"  >
                    {account?.branch_code}
                  </Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <StatusHandler
          type="empty"
          title="حسابی یافت نشد"
          description="هیچ حسابی برای انتخاب موجود نیست"
        />
      )}
  
    </div>
  );
};

export default ChequeAccountsScreen; 