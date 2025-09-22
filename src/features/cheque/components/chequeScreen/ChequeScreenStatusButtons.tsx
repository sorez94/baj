import React, {useState} from "react";
import styles from "@/features/cheque/components/chequeScreen/ChequeScreenStatus.module.scss";
import {Button, Modal} from "@/shared/components";
import {setScreen, updateBackRequestThunk} from "@/features/cheque/store/chequeSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";

enum CompareTypeEnum {
  MATCHED = "MATCHED",
  EXCEEDED = "EXCEEDED",
  MISMATCHED = "MISMATCHED",
}

interface ChequeStatusScreenButtonsProps {
  status?: CompareTypeEnum;
}

const ChequeScreenStatusButtons: React.FC<ChequeStatusScreenButtonsProps> = ({status}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showReselectModal, setShowReselectModal] = useState(false);
  const {internalAddCheque} = useSelector((state: RootState) => state.cheque.api);
  const requestId = internalAddCheque.data?.data?.request_id;
  const handleBack = () => dispatch(setScreen("chequeSheetsScreen"));
  const handleContinue = () => dispatch(setScreen("chequeUploadScreen"));
  const handleConfirm = () => dispatch(setScreen("chequeUploadScreen"));
  const handleReSelect = () => setShowReselectModal(true);

  const backhandler = async () => {
    const response = await dispatch(updateBackRequestThunk(requestId));
    if (response.payload.data.request_id) {
      dispatch(setScreen("chequeStartScreen"));
    }
  }

  const renderModal = () => (
    <Modal
      isOpen={showReselectModal}
      onClose={() => setShowReselectModal(false)}
      title="انتخاب مجدد چک"
      body="آیا میخواهید برگه چک دیگری را انتخاب کنید؟"
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
  );

  const renderButton = (
    label: string,
    onClick: () => void,
    variant: "outlined" | "filled" = "filled"
  ) => (
    <Button
      className={styles.btn}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      variant={variant}
      fullWidth
    >
      {label}
    </Button>
  );

  return (
    <div className={styles.buttonContainer}>
      {(status === CompareTypeEnum.EXCEEDED || status === CompareTypeEnum.MISMATCHED) && renderModal()}

      {status === CompareTypeEnum.EXCEEDED && (
        <>
          {renderButton("انتخاب مجدد چک", handleReSelect, "outlined")}
          {renderButton("تایید میکنم", handleConfirm)}
        </>
      )}

      {status === CompareTypeEnum.MISMATCHED && (
        <>
          {renderButton("انتخاب مجدد چک", handleReSelect, "outlined")}
          {renderButton("بازگشت", handleBack)}
        </>
      )}

      {status === CompareTypeEnum.MATCHED && renderButton("ادامه", handleContinue)}

      {!status && renderButton("بازگشت", handleBack)}
    </div>
  );
};

export default ChequeScreenStatusButtons;
