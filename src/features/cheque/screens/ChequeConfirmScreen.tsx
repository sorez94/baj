import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import ChequeConfirmScreenInternalDetail
  from "@/features/cheque/components/chequeConfirmScreen/ChequeConfirmScreenInternalDetail";
import ChequeConfirmScreenConfirmImage
  from "@/features/cheque/components/chequeConfirmScreen/ChequeConfirmScreenConfirmImage";
import ChequeConfirmScreenRejectCheque
  from "@/features/cheque/components/chequeConfirmScreen/ChequeConfirmScreenRejectCheque";
import {StatusHandler} from "@/shared/components";
import {previousScreen} from "@/features/cheque/store/chequeSlice";

const ChequeConfirmScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {getStepInquiry} = useSelector((state: RootState) => state.cheque.api);
  // const {request_id, bank_type, step, info} = getStepInquiry?.data?.data;
  const {request_id, bank_type, step, info} = {
    request_id: '3697e085044ea1c06000',
    bank_type: 'INTERNAL',
    step: 'REJECT_IMAGE',
    info: [
      "مغایرت اطلاعات",
      "قلم خوردگی"
    ]
  }

  if (getStepInquiry?.isLoading) {
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  if (getStepInquiry.error) {
    return (
      <StatusHandler
        type="error"
        description={getStepInquiry.error.message || 'مشکلی پیش آمده است.'}
        onConfirm={() => dispatch(previousScreen())}
        confirmText="بازگشت"
      />
    );
  }

  return (
    <>
      {bank_type === 'INTERNAL' && step === 'REJECT_IMAGE' && <ChequeConfirmScreenRejectCheque info={info}/>}
      {bank_type === 'INTERNAL' && step === 'ISSUE' && <ChequeConfirmScreenInternalDetail/>}
      {bank_type === 'INTERNAL' && step === 'CONFIRM_IMAGE' && <ChequeConfirmScreenConfirmImage/>}
    </>
  );
};

export default ChequeConfirmScreen;
