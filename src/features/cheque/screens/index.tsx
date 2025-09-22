'use client';

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store';
import {MainLayout} from '@/shared/components';
import ChequeStartScreen from './ChequeStartScreen';
import ChequeAccountsScreen from './ChequeAccountsScreen';
import ChequeUploadScreen from './ChequeUploadScreen';
import {clearAll} from '../store/chequeSlice';
import ChequeDeliveryScreen from "@/features/cheque/screens/ChequeDeliveryScreen";
import ChequeBankConfirmationScreen from "./ChequeBankConfirmationScreen";
import ChequeScreen from "@/features/cheque/screens/ChequeScreen";
import ChequeSheetsScreen from './ChequeSheetsScreen';
import {useBackAction} from '@/shared/hooks/useBackAction';
import {useRoute} from '@/shared/hooks/useRoute';
import ChequeDeliveryInfoScreen from "@/features/cheque/screens/ChequeDeliveryInfoScreen";
import ChequeExternalInquiryScreen from "@/features/cheque/screens/ChequeExternalInquiryScreen";
import ChequeConfirmScreen from "@/features/cheque/screens/ChequeConfirmScreen";
import ChequeSayadExternal from "@/features/cheque/screens/ChequeSayadExternal";
import ChequeCheckbooksScreen from "./ChequeCheckbooksScreen";

// Main Cheque Screen Component
const ChequeMainScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRoute();

  // Get current screen from Redux state
  const {screen} = useSelector((state: RootState) => state.cheque);
  // Render different screens based on Redux state

  // Set back action for this screen
  useBackAction({
    actionType: 'cheque/previousScreen',
    payload: null
  });

  useEffect(() => {
    // Cleanup function to clear all cheque states on unmount
    return () => {
      dispatch(clearAll());
    };
  }, []);

  const renderCurrentScreen = () => {
    switch (screen) {
      case 'chequeStartScreen':
        return <ChequeStartScreen/>;
      case 'chequeAccountsScreen':
        return <ChequeAccountsScreen/>;
      case 'chequeCheckbooksScreen':
        return <ChequeCheckbooksScreen/>;
      case 'chequeScreen':
        return <ChequeScreen/>;
      case 'chequeSheetsScreen':
        return <ChequeSheetsScreen/>;
      case 'chequeDeliveryScreen':
        return <ChequeDeliveryScreen/>;
      case 'chequeConfirmScreen':
        return <ChequeConfirmScreen/>;
      case 'chequeBankConfirmationScreen':
        return <ChequeBankConfirmationScreen/>;
      case 'chequeDeliveryInfoScreen':
        return <ChequeDeliveryInfoScreen/>;
      case 'chequeExternalInquiryScreen':
        return <ChequeExternalInquiryScreen/>;
      case 'chequeUploadScreen':
        return <ChequeUploadScreen/>;
      case 'chequeSayadExternal':
        return <ChequeSayadExternal/>;
      default:
        return <ChequeStartScreen/>;
    }
  };

  return (
    <MainLayout
      hasNotif={true}
      hasSupport={true}
      hasProfile={true}
      isHomeHeader={false}
      hasBack={true}
      hasTitle={true}
      title="چک صیادی"
      containerPadding={true}
      hasThemeToggle={true}
    >
      {renderCurrentScreen()}
    </MainLayout>
  );
};

export default ChequeMainScreen; 
