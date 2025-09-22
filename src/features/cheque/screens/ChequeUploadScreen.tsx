'use client';

import React, { useState , useEffect} from 'react';
import { Typography, Button, Modal, BottomSheet, List, StatusHandler } from '@/shared/components';
import ChequeUploadScreenGuidance from '../components/chequeUploadScreen/ChequeUploadScreenGuidance';
import ChequeUploadScreenUpload from '../components/chequeUploadScreen/ChequeUploadScreenUpload';
import styles from './ChequeUploadScreen.module.scss';
import { getUploadImagesInfoThunk,
     getSubsystemRequirementsThunk,
      sendImageThunk ,
      clearSendImageData,
    updateBackRequestThunk,
    clearBackData
    } from '../store/chequeSlice';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useBackAction, useRoute } from '@/shared/hooks';


type UploadScreen = "guidance" | "upload" | "success"

const ChequeUploadScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRoute();

  useBackAction({ 
    actionType: 'cheque/previousScreen',
    payload: null 
  });

  const { getUploadImagesInfo, internalAddCheque , subsystemRequirements , sendImage ,updateBackRequest,getStepInquiry } = useSelector((state: RootState) => state.cheque.api);
  const { chequeScreen } = useSelector((state: RootState) => state.cheque);

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [showReselectModal, setShowReselectModal] = useState<boolean>(false);
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const [uploadScreen , setUploadScreen] = useState<UploadScreen>(chequeScreen.screen)

  const [files, setFiles] = useState<any>({fileOne: null, fileTwo: null});

  
  // Mock request ID - in real app this would come from props or context
  const requestId = internalAddCheque.data?.data?.request_id;

  useEffect(() => {
    if(uploadScreen === "guidance"){
      dispatch(getSubsystemRequirementsThunk(requestId));
    }else if(uploadScreen === "upload"){
      dispatch(getUploadImagesInfoThunk(requestId));
    }else if(uploadScreen === "success"){

    }
  }, [requestId , uploadScreen]);


  const backhandler = async() => {
    const response = await dispatch(updateBackRequestThunk(requestId));
    if(response.payload.data.request_id){
      router.dispatch("cheque/setScreen", "chequeStartScreen");
    }
  }

  if(getUploadImagesInfo.isLoading || subsystemRequirements.isLoading || sendImage.isLoading || updateBackRequest.isLoading){
    return (
      <StatusHandler
        type="loading"
      />
    );
  }

  // handling back states

  if(updateBackRequest.error){
    return (
      <StatusHandler
        type="error"
        description={updateBackRequest.error?.message}
        onConfirm={() => dispatch(clearBackData())}
        confirmText="بازگشت"
      />
    );
  }

  // handling getUploadImagesInfo states
  if(getUploadImagesInfo.error){
    return (
      <StatusHandler
        type="error"
        description={getUploadImagesInfo.error?.message}
        onConfirm={() => router.dispatch("cheque/previousScreen", null)}
        confirmText="بازگشت"
      />
    );
  }

  // handling subsystemRequirements states
  if(subsystemRequirements.error){
    return (
      <StatusHandler
        type="error"
        description={subsystemRequirements.error?.message}
        onConfirm={() => router.dispatch("cheque/previousScreen", null)}
        confirmText="بازگشت"
      />
    );
  }

   // handling sendImage states
  if(sendImage.data?.message){
    return (
      <StatusHandler
        type="empty"
        description={sendImage.data?.message}
        image='/assets/images/icons/features/cheque/waitCheque.svg'
        imageSize={150}
        confirmText='بازگشت'
        onConfirm={() => router.dispatch("cheque/previousScreen", null)}  // here we should check again it should not be start
      />
    );
  }

  if(sendImage.error){
    return (
      <StatusHandler
        type="error"
        description={sendImage.error.message}
        onConfirm={() => dispatch(clearSendImageData())}
        confirmText="بازگشت"
      />
    );
  }



  // if(getUploadImagesInfo.error){
  //   return (
  //     <StatusHandler
  //       type="error"
  //       description={getUploadImagesInfo.error.message}
  //       onConfirm={() => dispatch(setScreen('chequeSheets'))}
  //       confirmText="بازگشت"
  //     />
  //   );
  // }

  const confirmDisableHandler = () => {
     
    if(getUploadImagesInfo.data?.data.front_image !== null && getUploadImagesInfo.data?.data.back_image !== null){
      return false;
    }
    if(files.fileOne === null || files.fileTwo === null){
      return true;
    }
    return false;
  }


  if (uploadScreen === "guidance") {
    return (
      <ChequeUploadScreenGuidance 
        onContinue={() => setUploadScreen("upload")} 
      />
    );
  }

  if(uploadScreen === "success"){
      return (
        <StatusHandler
          type="empty"
          description={Array.isArray(getStepInquiry?.data?.data?.info) && getStepInquiry.data.data.info.length > 0 ? getStepInquiry.data.data.info[0] : ''}
          image='/assets/images/icons/features/cheque/waitCheque.svg'
          imageSize={150}
          confirmText='بازگشت'
          onConfirm={() => router.dispatch("cheque/previousScreen", null)}  // here we should check again it should not be start
        />
      );
  }
  
  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadCotent}>
      {/* Header helper text */}
      <Typography variant="bodyMedium" className={styles.headerHelperText}>
        از رو و پشت فیزیک چک عکس بگیرید و در این بخش آپلود کنید.
      </Typography>

      {/* Front side upload */}
      <div className={styles.uploadSection}>
        <Typography variant="bodyMedium" className={styles.sectionTitle}>
          عکس روی چک
        </Typography>
        <ChequeUploadScreenUpload 
          requestId={requestId}
          type="front"
          validSize={getUploadImagesInfo.data?.data?.valid_size}
          allowedTypes={['jpg', 'jpeg']}
          existingImageData={getUploadImagesInfo.data?.data?.front_image}
          onUploadSuccess={(data) => {

            setFiles({...files, fileOne: data});
            // setFrontPreview(data.file_name);
            // setUploadError(null);
          }}
          onUploadError={(error) => {
            // console.error('Front upload error:', error);
            // setUploadError(error);
          }}
          onUploadStart={() => {
            // setUploadError(null);
          }}
        />
      </div>

      {/* Back side upload */}
      <div className={styles.uploadSection}>
        <Typography variant="bodyMedium"  className={styles.sectionTitle}>
          عکس پشت چک
        </Typography>
        <ChequeUploadScreenUpload 
          requestId={requestId}
          type="back"
          validSize={getUploadImagesInfo.data?.data?.valid_size}
          allowedTypes={['jpg', 'jpeg']}
          existingImageData={getUploadImagesInfo.data?.data?.back_image}
          onUploadSuccess={(data) => {
            setFiles({...files, fileTwo: data});
            // setUploadError(null);
          }}
          onUploadError={(error) => {
            // setUploadError(error);
          }}
          onUploadStart={() => {
            // setUploadError(null);
          }}
        />
      </div>

      {/* Error display */}
      {uploadError && (
        <div className={styles.errorContainer}>
          <Typography variant="bodySmall" className={styles.errorText}>
            {uploadError}
          </Typography>
        </div>
      )}

      {/* Notes */}
      <div className={styles.notesContainer}>
        {getUploadImagesInfo.data?.data?.info?.map((note: string, index: number) => (
          <Typography key={index} variant="bodySmall" className={styles.bulletStyle}>
            • {note}
          </Typography>
        ))}
      </div>
      </div>
      {/* Actions */}
      <div className={styles.actionsContainer}>
         <Button 
           variant="outlined" 
           className={styles.actionButton}
           onClick={() => setShowReselectModal(true)}
         > 
          انتخاب مجدد چک
        </Button>
        <Button 
        disabled={confirmDisableHandler()}
        className={styles.actionButton}
        onClick={() => {
          dispatch(sendImageThunk(requestId));
        }}
        >
          تأیید
        </Button>
      </div>

      {/* Reselect Modal */}
      <Modal
        isOpen={showReselectModal}
        onClose={() => setShowReselectModal(false)}
        title="انتخاب مجدد چک"
        body="آیا میخواهید برگه چک دیگری را انتخاب کنید؟"
        primaryAction={{
          label: "انتخاب مجدد",
          onClick: () => {
            setShowReselectModal(false);
            backhandler()
          }
        }}
        secondaryAction={{
          label: "انصراف",
          onClick: () => setShowReselectModal(false)
        }}
      />

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <List
          items={[
            {
              id: 're-upload',
              title: 'آپلود مجدد',
              icon: <div style={{ fontSize: '20px' }}>🔄</div>,
              onClick: () => {
                setShowBottomSheet(false);
                // Handle re-upload logic here
                console.log('Re-upload clicked');
              }
            },
            {
              id: 're-take-photo',
              title: 'عکس برداری مجدد',
              icon: <div style={{ fontSize: '20px' }}>📷</div>,
              onClick: () => {
                setShowBottomSheet(false);
                // Handle re-take photo logic here
                console.log('Re-take photo clicked');
              }
            },
          ]}
        />
      </BottomSheet>
    </div>
  );
};

export default ChequeUploadScreen;