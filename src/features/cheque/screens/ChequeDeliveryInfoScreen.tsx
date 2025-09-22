import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  clearDeliveryInfoData,
  getDeliveryInfoThunk,
  previousScreen,
  setScreen, updateBackRequestThunk
} from "@/features/cheque/store/chequeSlice";
import { Button, StatusHandler, Typography } from "@/shared/components";
import ChequeDeliveryInfoScreenNotificationCard from "@/features/cheque/components/chequeDeliveryInfoScreen/ChequeDeliveryInfoScreenNotificationCard";
import styles from "@/features/cheque/screens/ChequeDeliveryInfoScreen.module.scss";

type DataType = {
  main_title: string;
  info_title: string;
  info: Array<string>;
  warning: string;
};

const ChequeDeliveryInfoScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initChequeRequest, getDeliveryInfo } = useSelector((state: RootState) => state.cheque.api);
  const { request_id } = initChequeRequest?.data?.data;
  const data: DataType = getDeliveryInfo?.data?.data || [];

  const handleBack = async () => {
    const response = await dispatch(updateBackRequestThunk(request_id));
    if (response.payload.data.request_id) {
      dispatch(setScreen("chequeStartScreen"));
    }
  };

  const handleGetDeliveryInfo = async () => {
    dispatch(clearDeliveryInfoData());
    if (request_id) {
      dispatch(
        getDeliveryInfoThunk({
          requestId: request_id
        })
      );
    }
  };

  useEffect(() => {
    handleGetDeliveryInfo();
  }, [request_id]);

  if (getDeliveryInfo?.isLoading) {
    return <StatusHandler type="loading" />;
  }

  if (getDeliveryInfo?.error) {
    return (
      <StatusHandler
        type="error"
        description={getDeliveryInfo?.error?.message || 'مشکلی پیش آمده است.'}
        onRetry={handleGetDeliveryInfo}
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
      <div className={styles.deliveryContainer}>
        <Typography sx={{ margin: '16px 0 24px 0' }} variant="bodyMedium">{data.main_title}</Typography>
        <Typography sx={{ marginBottom: '8px' }} variant="titleSmall">{data.info_title}</Typography>
        <ul className={styles.infoList}>
          {data?.info?.map((item, idx) => (
            <li className={styles.infoListItem} key={idx}>
              <Typography variant="bodySmall">{item}</Typography>
            </li>
          ))}
        </ul>
        <ChequeDeliveryInfoScreenNotificationCard info={data.warning} />
      </div>
      <div className={styles.actionsContainer}>
        <Button className={styles.actionButton} onClick={handleBack}>
          بازگشت
        </Button>
      </div>
    </>
  );
};

export default ChequeDeliveryInfoScreen;
