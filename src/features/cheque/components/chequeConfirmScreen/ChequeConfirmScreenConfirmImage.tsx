import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {
  clearChequeStatusData,
  clearExternalIssue,
  externalIssueThunk,
  getChequeStatusThunk,
  previousScreen,
  setScreen
} from "@/features/cheque/store/chequeSlice";
import {Button, StatusHandler} from "@/shared/components";
import {useMediaQuery, useTheme} from "@mui/material";
import styles from "@/features/cheque/components/chequeConfirmScreen/ChequeConfirmScreenConfirmImage.module.scss";
import ChequeScreenStatusHighlightedInfo
  from "@/features/cheque/components/chequeScreen/ChequeScreenStatusHighlightedInfo";
import Typography from "../../../../shared/components/Typography/Typography";
import ExpectedCheque from "@/shared/components/Cheque/ExpectedCheque";
import RegisteredCheque from "@/shared/components/Cheque/RegisteredCheque";

const ChequeConfirmScreenConfirmImage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const {
    getChequeStatus,
    internalAddCheque,
    initChequeRequest,
    externalIssue
  } = useSelector((state: RootState) => state.cheque.api);
  const {amount, beneficiary_id, beneficiary_name, due_date, request_id} = internalAddCheque?.data?.data;
  const requestId = initChequeRequest?.data?.data?.request_id;
  const chequeStatusData = getChequeStatus?.data?.data || [];

  const handleGetChequeStatus = async () => {
    dispatch(clearChequeStatusData())
    dispatch(clearExternalIssue())
    if (request_id) {
      const inputData = {
        request_id: request_id,
        due_date: due_date,
        amount: amount,
        beneficiary_id: beneficiary_id,
        beneficiary_name: beneficiary_name
      }
      dispatch(getChequeStatusThunk(inputData));
    }
  }

  useEffect(() => {
    handleGetChequeStatus()
  }, [request_id, dispatch]);

  const fontSize = isMobile
    ? '14px'
    : isTablet
      ? '18px'
      : '18px';

  const handleSuccessContinue = () => {

  }

  const handleContinue = async () => {
    if (!requestId) return;
    await dispatch(
      externalIssueThunk({
        requestId: requestId
      })
    );
  }

  if (getChequeStatus?.isLoading || externalIssue.isLoading) {
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  if (getChequeStatus.error) {
    return (
      <StatusHandler
        type="error"
        description={getChequeStatus.error.message || 'مشکلی پیش آمده است.'}
        onRetry={handleGetChequeStatus}
        retryText="تلاش مجدد"
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

  if (externalIssue.error) {
    return (
      <StatusHandler
        type="error"
        description={externalIssue.error.message || 'مشکلی پیش آمده است.'}
        onRetry={handleContinue}
        retryText="تلاش مجدد"
        onConfirm={() => dispatch(setScreen('chequeConfirmScreen'))}
        confirmText="بازگشت"
      />
    );
  }

  if (externalIssue?.data?.data?.request_id) {
    return (
      <StatusHandler
        type="success"
        description={externalIssue?.data?.data?.message}
        bodyMargin='var(--spacing-6)'
        onConfirm={handleSuccessContinue}
        confirmText="ادامه"
      />
    )
  }


  if (externalIssue.error) {
    return (
      <StatusHandler
        type="error"
        description={externalIssue.error.message || 'مشکلی پیش آمده است.'}
        onRetry={handleContinue}
        retryText="تلاش مجدد"
        onConfirm={() => dispatch(setScreen('chequeConfirmScreen'))}
        confirmText="بازگشت"
      />
    );
  }

  if (!chequeStatusData || chequeStatusData.length === 0) {
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.infoStatus}>
          <ChequeScreenStatusHighlightedInfo
            info={chequeStatusData?.info}
            highlight={chequeStatusData?.info_high_light}
          />
        </div>
        <div>
          <div className={styles.expectedCheque}>
            <Typography fontSize={fontSize} variant="bodyMedium" color="--color-text-primary">
              چک مورد انتظار باجت:
            </Typography>
          </div>
          <ExpectedCheque data={chequeStatusData} backgroundTextColor='var(--color-primary-dark)'/>
          <div className={styles.registeredCheque}>
            <Typography fontSize={fontSize} variant="bodyMedium" color="textSecondary" className="mt-4">
              چک ثبت شده شما:
            </Typography>
          </div>
          <RegisteredCheque data={chequeStatusData}/>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.btn}
          onClick={(e) => {
            e.stopPropagation();
            handleContinue();
          }}
          variant='filled'
          fullWidth
        >
          ادامه
        </Button>
      </div>
    </div>
  );
};

export default ChequeConfirmScreenConfirmImage;
