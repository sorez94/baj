import React, {useState} from 'react';
import {Card, Modal, StatusHandler, Typography} from "@/shared/components";
import {previousScreen, setScreen, updateBackRequestThunk} from "@/features/cheque/store/chequeSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import styles from './ChequeConfirmScreenRejectCheque.module.scss';


interface RejectReasonsProps {
  title?: string;
  reasons: string[] | null;
}

const RejectReasons: React.FC<RejectReasonsProps> = ({
                                                       title = "دلایل رد شدن چک:",
                                                       reasons
                                                     }) => {
  return (
    <div className={styles.rejectReasonsContainer}>
      <Typography variant='labelLarge'
                  style={{margin: "var(--spacing-1) var(--spacing-1) var(--spacing-2) var(--spacing-1) "}}>{title}</Typography>
      <ul className={styles.rejectList}>
        {reasons?.map((reason, index) => (
          <li key={index} className={styles.rejectListItem}>
            <Typography variant='bodySmall'>{reason}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChequeConfirmScreenRejectCheque = ({info}: { info: Array<string> | null }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showReselectModal, setShowReselectModal] = useState(false);
  const handleReselectCheque = () => setShowReselectModal(true);
  const {initChequeRequest} = useSelector((state: RootState) => state.cheque.api);
  const {request_id} = initChequeRequest?.data?.data;

  const backhandler = async () => {
    const response = await dispatch(updateBackRequestThunk(request_id));
    if (response.payload.data.request_id) {
      dispatch(setScreen("chequeStartScreen"));
    }
  }

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
            className={styles.card}
          >
            <RejectReasons
              reasons={info}
            />
          </Card>
        }
      />
    </>
  );
};

export default ChequeConfirmScreenRejectCheque;
