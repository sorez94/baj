import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {
  addAccountThunk,
  clearInternalChequeDetailData, clearIssueData,
  getInternalChequeDetailThunk, previousScreen, putIssueThunk,
  setScreen, updateBackRequestThunk
} from "@/features/cheque/store/chequeSlice";
import {
  Button,
  Checkbox,
  DynamicIcons,
  Input,
  MenuItem,
  Modal,
  Select,
  StatusHandler,
  Typography
} from "@/shared/components";
import styles from './ChequeConfirmScreenInternalDetail.module.scss';
import Snackbar from "@/shared/components/Snackbar/Snackbar";

type DataType = {
  request_id: string,
  sayad: string,
  seri: string,
  serial: string,
  due_date: string,
  amount: number,
  beneficiary_name: string,
  beneficiary_id: string,
  reason: string,
  info: string
}

// Make a small wrapper that matches LucideIcon signature
const CalendarAdapter: React.FC<{ size?: number; style?: React.CSSProperties; onClick?: () => void }> = ({ size = 24, style, onClick }) => (
  <DynamicIcons type="calendar" width={size} height={size} style={style} onClick={onClick} />
);

const RialAdapter: React.FC<{ size?: number; style?: React.CSSProperties; onClick?: () => void }> = ({ size = 24, style, onClick }) => (
  <DynamicIcons type="rial" width={size} height={size} style={style} onClick={onClick} />
);
// amount, beneficiary_id, beneficiary_name, due_date, request_id
const ChequeConfirmScreenInternalDetail = () => {
  const [showReselectModal, setShowReselectModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const {initChequeRequest, getInternalChequeDetail, putIssue} = useSelector((state: RootState) => state.cheque.api);
  const {request_id} = initChequeRequest?.data?.data;
  const data: DataType = getInternalChequeDetail?.data?.data || []
  const [checked, setChecked] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const snackbarMessage = useRef('')

  const backhandler = async () => {
    const response = await dispatch(updateBackRequestThunk(request_id));
    if (response?.payload?.data?.request_id) {
      dispatch(setScreen("chequeStartScreen"));
    }
  }

  const handleSuccessContinue = () => {
    dispatch(setScreen(
      "chequeDeliveryInfoScreen"));
  }

  const handleGetInternalChequeDetail = async () => {
    dispatch(clearInternalChequeDetailData());
    if (request_id) {
      dispatch(
        getInternalChequeDetailThunk({
          requestId: request_id
        })
      );
    }
  };

  useEffect(() => {
    handleGetInternalChequeDetail();
  }, [request_id]);


  useEffect(() => {
    if (putIssue?.error) {
      snackbarMessage.current = putIssue.error.message;
      setOpenSnackbar(true);
    }
  }, [putIssue?.error]);

  const handleChangeChecked = () => {
    setChecked((prevState) => !prevState);
  }

  const handleConfirmCheque = async () => {
    if (request_id) {
      await dispatch(putIssueThunk({
        requestId: request_id
      }))
    }
  }

  if (getInternalChequeDetail?.isLoading || putIssue.isLoading) {
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  if (putIssue?.data?.data?.request_id) {
    return (
      <StatusHandler
        type="success"
        description={putIssue?.data?.data?.message}
        bodyMargin='var(--spacing-6)'
        onConfirm={handleSuccessContinue}
        confirmText="ادامه"
      />
    )
  }

  if (getInternalChequeDetail?.error) {
    return (
      <StatusHandler
        type="error"
        description={getInternalChequeDetail?.error?.message || 'مشکلی پیش آمده است.'}
        onRetry={handleGetInternalChequeDetail}
        retryText="تلاش مجدد"
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

  if (!data) {
    return (
      <StatusHandler
        type="empty"
        title="اطلاعات چک یافت نشد"
        description="هیچ اطلاعاتی برای این چک موجود نیست"
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }


  return (
    <>

      <div className={styles.confirmContainer}>
        <Typography sx={{marginBottom: '24px', alignSelf: 'flex-start'}} variant='bodyMedium'>
          صحت اطلاعات چک را بررسی و تائید کنید.
        </Typography>

        <div className={styles.inputContainer}>
          <Input disabled value={data?.sayad} fullWidth isRTL label="شناسه صیاد"/>
          <Input value={data.serial} fullWidth isRTL label="شماره سریال" disabled/>
          <Input iconSize={24} rightIcon={CalendarAdapter} value={data.due_date} fullWidth isRTL label="در تاریخ"
                 disabled/>
          <Input iconSize={24} rightIcon={RialAdapter} value={(data?.amount)?.toLocaleString("fa-IR")} fullWidth isRTL
                 label="مبلغ چک" disabled/>
          <Input value={data.beneficiary_name} fullWidth isRTL label="در وجه" disabled/>
          <Input value={data.beneficiary_id} fullWidth isRTL label="شناسه ملی دریافت کننده" disabled/>
          <Select label="بابت" defaultValue="option1" fullWidth isRTL disabled>
            <MenuItem value="option1">{data.reason}</MenuItem>
          </Select>
        </div>

        <div className={styles.check}>
          <Checkbox
            checked={checked}
            onChange={handleChangeChecked}
            label={data?.info}
          />
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <Button
          variant="outlined"
          className={styles.actionButton}
          onClick={() => setShowReselectModal(true)}
        >
          انتخاب مجدد چک
        </Button>
        <Button
          disabled={!checked}
          className={styles.actionButton}
          onClick={handleConfirmCheque}
        >
          ثبت چک
        </Button>
      </div>
      <Modal
        isOpen={showReselectModal}
        onClose={() => setShowReselectModal(false)}
        title="انتخاب مجدد چک"
        body="در حال حاضر عکس چک شما تائید شده است. آیا مطمئن هستید که می‌خواهید چک جدیدی را انتخاب کنید؟"
        primaryAction={{
          label: "انتخاب مجدد",
          onClick: () => {
            setShowReselectModal(false);
            backhandler();
          }
        }}
        secondaryAction={{
          label: "انصراف",
          onClick: () => setShowReselectModal(false)
        }}
      />
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage.current}
        variant="error"
        boxBgColor="#303133"
        boxBorderColor="#303133"
        boxPadding="8px 8px"
        textColor='var(--color-text-primary-dark) !important'
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

export default ChequeConfirmScreenInternalDetail;
