import React, {useState} from 'react';
import {Card, Modal, StatusHandler, Typography} from "@/shared/components";
import {previousScreen, setScreen, updateBackRequestThunk} from "@/features/cheque/store/chequeSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {IMAGE_PATHS} from "@/shared/utils/images";

interface RejectReasonsProps {
  title?: string;
  reasons: string[];
}

const RejectReasons: React.FC<RejectReasonsProps> = ({
                                                       title = "دلایل رد شدن چک:",
                                                       reasons
                                                     }) => {
  return (
    <div style={{direction: "rtl", textAlign: "right", fontFamily: "inherit"}}>
      <Typography variant='labelLarge'
                  style={{margin: "var(--spacing-1) var(--spacing-1) var(--spacing-2) var(--spacing-1) "}}>{title}</Typography>
      <ul style={{paddingRight: "20px", margin: 0}}>
        {reasons.map((reason, index) => (
          <li key={index} style={{marginBottom: "var(--spacing-2)"}}>
            <Typography variant='bodySmall'>{reason}</Typography>

          </li>
        ))}
      </ul>
    </div>
  );
};

enum STEP {
  REJECT = "REJECT_PHYSIC",
  CONFIRM = "CONFIRM_PHYSIC",
  INIT = "INIT"
}

const ChequeBankConfirmationScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {getStepInquiry, internalAddCheque} = useSelector((state: RootState) => state.cheque.api);
  const requestId = internalAddCheque.data?.data?.request_id;
  // const stepInquiryData =getStepInquiry.data.data

  const backhandler = async () => {
    const response = await dispatch(updateBackRequestThunk(requestId));
    if (response.payload.data.request_id) {
      dispatch(setScreen("chequeStartScreen"));
    }
  }

  const stepInquiryData = {
    request_id: "3697e085044ea1c06000",
    bank_type: "INTERNAL",
    step: "REJECT_PHYSIC",
    info: [
      "مغایرت اطلاعات",
      "قلم خوردگی"
    ]
  };


  // const stepInquiryData = {
  //   request_id: "3697e085044ea1c06000",
  //   bank_type: "INTERNAL",
  //   step: "CONFIRM_PHYSIC",
  //   info: [
  //     "چک شما با موفقیت توسط بانک دریافت و تائید گردید"
  //   ]
  // }

  console.log((!stepInquiryData?.step || (stepInquiryData?.step === STEP.INIT)))

  const [showReselectModal, setShowReselectModal] = useState(false);
  const handleReselectCheque = () => setShowReselectModal(true);
  const handleContinue = () => {
  };
  return (
    <>
      <Modal
        isOpen={showReselectModal}
        onClose={() => setShowReselectModal(false)}
        title="انتخاب مجدد چک"
        body="با توجه به عدم تائید چک، اکنون می‌توانید چک جدیدی را انتخاب و فرآیند را مجدد آغاز کنید."
        primaryAction={{
          label: "انتخاب مجدد",
          onClick: () => {
            setShowReselectModal(false);
            backhandler();
          },
        }}
        secondaryAction={{
          label: "انصراف",
          onClick: () => setShowReselectModal(false),
        }}
      />
      {stepInquiryData?.step === STEP.REJECT &&
        <StatusHandler
          type="failed"
          description="چک شما توسط بانک رد شد."
          onRetry={() => dispatch(previousScreen())}
          retryText="بازگشت"
          bodyMargin='var(--spacing-6)'
          onConfirm={handleReselectCheque}
          confirmText="انتخاب مجدد چک"
          body={
            <Card
              variant="outlined"
              padding="sm"
              style={{width: '100%'}}
            >
              <RejectReasons
                reasons={stepInquiryData?.info}
              />
            </Card>
          }
        />}
      {stepInquiryData?.step === STEP.CONFIRM &&
        <StatusHandler
          type="success"
          description={stepInquiryData?.info[0]}
          bodyMargin='var(--spacing-6)'
          onConfirm={handleContinue}
          confirmText="ادامه"
        />}
      {(!stepInquiryData?.step || (stepInquiryData?.step === STEP.INIT)) &&
        <StatusHandler
          type="empty"
          image={IMAGE_PATHS.FEATUERS.CHEQUE.UNDEFINED}
          imageSize={90}
          description={'وضعیت چک نامشخص است'}
          onRetry={() => dispatch(setScreen("chequeStartScreen"))}  // we should think about this again
          retryText="بازگشت به خانه"
        />
      }
    </>
  );
};

export default ChequeBankConfirmationScreen;
