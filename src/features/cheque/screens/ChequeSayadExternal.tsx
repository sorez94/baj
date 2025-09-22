import React, {useState} from 'react';
import {BottomSheet, Button, DynamicIcons, Input, StatusHandler, Typography} from "@/shared/components";
import styles from './ChequeSayadExternal.module.scss';
import Image from "next/image";
import {CircleX, CircleAlert} from "lucide-react";
import {
  clearExternalInquiryData,
  clearExternalAddData,
  postExternalInquiryThunk, previousScreen,
  putExternalAddThunk,
  setScreen
} from "@/features/cheque/store/chequeSlice";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {putExternalAdd} from "@/features/cheque";

const InfoRow = ({label, value}: { label: string; value: string }) => {
  return (
    <>
      <div className={styles.infoRow}>
        <Typography variant="labelMedium">{label}</Typography>
        <Typography variant="labelLarge">{value}</Typography>
      </div>
    </>
  );
};

const ChequeSayadExternal = () => {
  const {initChequeRequest, postExternalInquiry, putExternalAdd} = useSelector((state: RootState) => state.cheque.api);
  const dispatch = useDispatch<AppDispatch>();
  const {request_id} = initChequeRequest?.data?.data;
  const [sayad, setSayad] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleChangeSayad = (value: string) => {
    dispatch(clearExternalInquiryData());
    setSayad(value);
  };

  console.log(postExternalInquiry)

  const handleInquiry = async () => {
    dispatch(clearExternalInquiryData());
    const response = await dispatch(postExternalInquiryThunk({request_id, sayad}));
    if (response?.payload?.data?.request_id) {
      setShowBottomSheet(true)
    }
  };

  const handleBarcdoeScanner = () => {};

  const handleClearSayad = () => {
    dispatch(clearExternalInquiryData());
    setSayad('');
    setInputKey(k => k + 1); //
  };

  const onContinue = async () => {
    const response = await dispatch(putExternalAddThunk({request_id: '3932e6b860573c38e805', sayad: postExternalInquiry?.data?.data?.sayad, issued: postExternalInquiry?.data?.data?.issued}));
    if (response?.payload?.data?.request_id) {
      dispatch(setScreen("chequeUploadScreen"));
    }
  }

  if (postExternalInquiry?.isLoading || putExternalAdd?.isLoading) {
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  if(putExternalAdd?.error) {
    return (
      <StatusHandler
        type="empty"
        description={putExternalAdd.error?.message || 'مشکلی رخ داد'}
        onRetry={() => {
          dispatch(clearExternalAddData());
          dispatch(setScreen("chequeSayadExternal"));
        }}
        retryText="بازگشت"
      />
    )
  }

  return (
    <>
      <div className={styles.container}>
        <Typography sx={{margin: '16px 0px'}} variant='bodyMedium'>
          شناسه صیاد چک خود را وارد کنید.
        </Typography>
        <Input
          key={inputKey}
          value={sayad}
          fullWidth
          error={!!postExternalInquiry?.error?.message}
          errorText={postExternalInquiry?.error?.message}
          className={styles.inputMargin}
          placeholder="شناسه 16 رقمی صیاد..."
          rightIcon={!postExternalInquiry?.error?.message ? CircleX : CircleAlert}
          rightIconColor={!postExternalInquiry?.error?.message ? 'var(--color-input-secondary-dark)' : 'var(--color-error)'}
          rightIconClick={handleClearSayad}
          label="شناسه 16 رقمی صیاد"
          onChange={handleChangeSayad}
        />

        <Image
          className={styles.expectedChequeImage}
          src="/assets/images/cheques/sayad-cheque.png"
          alt="باجت - صیاد"
          width={1200}
          height={200}
        />
      </div>
      <div className={styles.actions}>
        <Button
          variant="text"
          style={{color: 'blue'}}
          rightIcon={<DynamicIcons type="barcode" style={{color: "var(--color-primary)"}}/>}
          onClick={handleBarcdoeScanner}
        >
          <Typography sx={{color: 'var(--color-primary) !important'}} variant='labelLarge'>
            اسکن بارکد چک
          </Typography>
        </Button>

        <Button
          variant="filled"
          onClick={handleInquiry}
          disabled={sayad.length !== 16}
        >
          استعلام
        </Button>
      </div>
      <BottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <Typography variant='bodyMedium' className={styles.bottomSheetText}> اطلاعات چک به شرح زیر است </Typography>
        <div className={styles.infoList}>
          <InfoRow label="صاحب حساب" value={postExternalInquiry?.data?.data?.owner}/>
          <InfoRow label="نام بانک" value={postExternalInquiry?.data?.data?.bank}/>
        </div>
        <Button onClick={onContinue} className={styles.continueBtn} variant='filled' fullWidth> تائید و ادامه </Button>
      </BottomSheet>
    </>
  );
};

export default ChequeSayadExternal;
