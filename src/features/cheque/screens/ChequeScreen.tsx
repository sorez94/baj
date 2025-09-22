import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {clearBackData, clearChequeStatusData, getChequeStatusThunk, previousScreen} from "@/features/cheque/store/chequeSlice";
import {StatusHandler} from "@/shared/components";
import ChequeScreenStatus from "@/features/cheque/components/chequeScreen/ChequeScreenStatus";

const ChequeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    getChequeStatus,
    internalAddCheque,
    initChequeRequest,
    updateBackRequest
  } = useSelector((state: RootState) => state.cheque.api);
  const {amount, beneficiary_id, beneficiary_name, due_date, request_id} = internalAddCheque?.data?.data;
  const requestId = initChequeRequest?.data?.data?.request_id;
  const chequeStatusData = getChequeStatus?.data?.data || [];

  const handleGetChequeStatus = async () => {
    dispatch(clearChequeStatusData())
    dispatch(clearBackData())
    if (initChequeRequest) {
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
  }, [requestId]);

  if (getChequeStatus?.isLoading || updateBackRequest?.isLoading) {
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  if (getChequeStatus.error || updateBackRequest?.error) {
    return (
      <StatusHandler
        type="error"
        description={getChequeStatus.error.message || updateBackRequest.error.message || 'مشکلی پیش آمده است.'}
        onRetry={handleGetChequeStatus}
        retryText="تلاش مجدد"
        onConfirm={() => dispatch(previousScreen())}
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
    <ChequeScreenStatus chequeStatusData={chequeStatusData}/>
  );
};

export default ChequeScreen;
