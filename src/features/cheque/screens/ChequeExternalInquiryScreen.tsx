import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store';
import {
  clearInternalChequeDetailData,
  getInternalChequeDetailThunk,
  setScreen
} from '@/features/cheque/store/chequeSlice';
import styles from './ChequeExternalInquiryScreen.module.scss';
import {Button, DynamicIcons, Modal, Typography} from '@/shared/components';
import Snackbar from '@/shared/components/Snackbar/Snackbar';
import ChequeDeliveryInfoScreenNotificationCard
  from '@/features/cheque/components/chequeDeliveryInfoScreen/ChequeDeliveryInfoScreenNotificationCard';

type DataType = {
  request_id: string;
  sayad: string;
  due_date: string;
  amount: number;
  beneficiary_name: string;
  beneficiary_id: string;
  reason: string;
  info: string;
}

const InfoRow = ({label, value}: { label: string; value: string }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    setOpenSnackbar(true);
    document.body.removeChild(textArea);
  };

  return (
    <>
      <div className={styles.infoRow}>
        <Typography variant="bodySmall">{label}</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <DynamicIcons
            onClick={() => handleCopy(value)} // Copy value to clipboard
            style={{margin: '4px'}}
            type="copy"
            width={18}
            height={18}
            color="var(--color-text-primary)"
          />
          <Typography variant="labelLarge">{value}</Typography>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        message="کپی شد"
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

const ChequeExternalInquiryScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {initChequeRequest} = useSelector((state: RootState) => state.cheque.api);
  const {request_id} = initChequeRequest?.data?.data;
  const [showReselectModal, setShowReselectModal] = useState<boolean>(false);

  const data = {
    data: {
      request_id: '3697e085044ea1c06000',
      sayad: '4263030000004375',
      due_date: '1404/10/10',
      amount: 800000000,
      beneficiary_name: 'بانک تجارت',
      beneficiary_id: '10100834460',
      reason: 'تسهیلات و تعهدات',
      info: 'به همراه بانک خود مراجعه کرده و چک خود را مطابق اطلاعات زیر ثبت کنید، سپس، به باجت بازگردید و ادامه فرایند را تکمیل کنید'
    },
    message: null
  };

  const handleGetInternalChequeDetail = async () => {
    dispatch(clearInternalChequeDetailData());
    if (request_id) {
      dispatch(getInternalChequeDetailThunk({requestId: request_id}));
    }
  };

  useEffect(() => {
    handleGetInternalChequeDetail();
  }, [request_id]);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
          <div className={styles.confirmContainer}>
            <Typography sx={{alignSelf: 'start'}} variant="bodyMedium">
              چک خود را به مشخصات زیر ثبت کنید.
            </Typography>
            <ChequeDeliveryInfoScreenNotificationCard info={data?.data?.info}/>
            <div className={styles.inputContainer}>
              <InfoRow label="شناسه صیاد" value={data?.data?.sayad}/>
              <InfoRow label="در تاریخ" value={data?.data?.due_date}/>
              <InfoRow label="مبلغ" value={data?.data?.amount.toLocaleString()}/>
              <InfoRow label="در وجه" value={data?.data?.beneficiary_name}/>
              <InfoRow label="شناسه ملی دریافت‌کننده" value={data?.data?.beneficiary_id}/>
              <InfoRow label="بابت" value={data?.data?.reason}/>
            </div>
          </div>
        </div>

        <div className={styles.actionsContainer}>
          <Button variant="outlined" className={styles.actionButton} onClick={() => setShowReselectModal(true)}>
            انتخاب مجدد چک
          </Button>
          <Button className={styles.actionButton} onClick={() => {/* Handle confirm */

          }}>
            ادامه
          </Button>
        </div>
      </div>
      <Modal
        isOpen={showReselectModal}
        onClose={() => setShowReselectModal(false)}
        title="انتخاب مجدد چک"
        body="در حال حاضر عکس چک شما تائید شده است. آیا مطمئن هستید که می‌خواهید چک جدیدی را انتخاب کنید؟"
        primaryAction={{
          label: 'انتخاب مجدد',
          onClick: () => {
            setShowReselectModal(false);
            dispatch(setScreen('chequeStartScreen'));
          }
        }}
        secondaryAction={{
          label: 'انصراف',
          onClick: () => setShowReselectModal(false)
        }}
      />
    </>
  );
};

export default ChequeExternalInquiryScreen;