'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Typography, DynamicIcons, Button, BottomSheet, List, ImagePreview, Modal } from '@/shared/components';
import { useImageUpload } from '../../hooks/useImageUpload';
import { ImageInfo } from '../../services/chequeApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styles from './ChequeUploadScreenUpload.module.scss';

import { downloadFrontImageUrl, downloadBackImageUrl } from '../../services/chequeApi';


interface ChequeUploadScreenUploadProps {
  requestId: string;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
  onUploadStart?: () => void;
  type: 'front' | 'back';
  validSize?: string;
  allowedTypes?: string[];
  existingImageData?: ImageInfo | null;
}

const ChequeUploadScreenUpload: React.FC<ChequeUploadScreenUploadProps> = ({
  requestId,
  onUploadSuccess,
  onUploadError,
  onUploadStart,
  type,
  validSize, // in kb
  allowedTypes = ['jpg', 'jpeg'],
  existingImageData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadState, uploadFrontImage, uploadBackImage, validateFile, startLoading, stopLoading ,resetUploadState} = useImageUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [localMessage, setLocalMessage] = useState<{type : "success" | "error" | "warning" | "info", message : string }>({type : "success", message : "" });

  // modal states
  const [addImageModal, setAddImageModal] = useState<boolean>(false)
  const [accessCameraModal , setAccessCameraModal] = useState<boolean>(false)
  const [accessCameraModalReason , setAccessCameraModalReason] = useState<string>("")

  // Get image info from Redux state for loading/error states
  const { getUploadImagesInfo } = useSelector((state: RootState) => state.cheque.api);


  // state for managing bottomSheet
  const [bottomSheetState, setBottomSheetState] = useState<{ open: boolean, type: string }>({
    open: false,
    type: 'success'
  });

  // Use existing image data from props if available, otherwise from Redux state
  const currentImageInfo: ImageInfo | null = existingImageData ||
    (type === 'front'
      ? getUploadImagesInfo.data?.data?.front_image || null
      : getUploadImagesInfo.data?.data?.back_image || null);


  const hasExistingImage = !!currentImageInfo;
  const loading = getUploadImagesInfo.isLoading;
  const error = getUploadImagesInfo.error;

  // Set up camera capture on component mount
  useEffect(() => {
    if (fileInputRef.current) {
      // Force camera capture mode
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.setAttribute('data-capture', 'environment');
    }
  }, []);


  async function getCameraPermissionState() {
    if (navigator.permissions) {
      try {
        const status = await navigator.permissions.query({ name: 'camera' });
        return status.state; // "granted" | "denied" | "prompt"
      } catch {
        return "unknown";
      }
    }
    return "unknown";
  }

  async function requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(t => t.stop()); // we just wanted permission
      return { granted: true };
    } catch (err : any) {
      if (err.name === "NotAllowedError") {
        return { granted: false, reason: "denied" };
      }
      if (err.name === "NotFoundError") {
        return { granted: false, reason: "no-camera" };
      }
      return { granted: false, reason: "unknown" };
    }
  }

  const openPicker = (withCapture: boolean) => {
    if (!fileInputRef.current) return;
    if (withCapture) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.setAttribute('data-capture', 'environment');
    } else {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.removeAttribute('data-capture');
    }
    fileInputRef.current.setAttribute('accept', 'image/*');
    fileInputRef.current.click();
  };

  function isMobileDevice() {
    if (typeof navigator === "undefined") return false;
  
    const ua = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
    // iPad before iPadOS 13
    if (mobileRegex.test(ua) || /iPad/.test(ua)) return true;
    // iPadOS 13+ (desktop UA + touch)
    if (/Macintosh/.test(ua) && "ontouchend" in document) return true;
    return false;
  }

  const handleTakePhoto = async() => {
    if (uploadState.isUploading) return;

    // Improved mobile detection to better handle iOS devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || (typeof window !== "undefined" && "ontouchstart" in window && /Mobile|Tablet|iPad|iPhone|iPod/.test(navigator.userAgent));
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Desktop → no camera sheet, just open file picker
    if (!isMobileDevice()) {
      openPicker(true);
      return;
    }
    // iOS Safari → rely on capture attribute (Permissions API/getUserMedia are unreliable)
    // if (isIOS && isSafari) {
    //   openPicker(true);
    //   return;
    // }

      // Other mobile browsers: use Permissions API if available, then request
  const state = await getCameraPermissionState(); // "granted" | "denied" | "prompt" | "unknown"

  if (state === 'granted') {
    // Camera already granted → open with capture to surface Camera option

    openPicker(true);
    return;
  }

  if (state === 'denied') {
    // Denied → show guidance modal and still open picker with capture (lets user pick Camera via system sheet if possible)
    setAccessCameraModal(true);
    setAccessCameraModalReason("با دادن اجازه دسترسی به دوربین، می‌توانید عکس چک خود را اسکن کنید.")
    return;
  }

  // "prompt" or "unknown" → explicitly request
  const req = await requestCamera();
  if (req.granted) {
    openPicker(true);
    
  } else {
    // Not granted (denied / no-camera / unknown) → show guidance, still fall back to picker with capture
    setAccessCameraModal(true);
    setAccessCameraModalReason("با دادن اجازه دسترسی به دوربین، می‌توانید عکس چک خود را اسکن کنید. اگر قبلاً اجازه دسترسی را رد کرده‌اید، لطفاً از تنظیمات دستگاه خود دسترسی به دوربین را فعال کنید.")
    return;
  } 

   


  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Helper to convert Gregorian date to Shamsi (Jalali)
  // This is a simple implementation; for production use, consider using a library like 'jalaali-js'
  function toJalali(gYear: number, gMonth: number, gDay: number) {
    let gy = gYear - 1600;
    let gm = gMonth - 1;
    let gd = gDay - 1;

    const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    let g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
    for (let i = 0; i < gm; ++i)
      g_day_no += g_days_in_month[i];
    if (gm > 1 && ((gYear % 4 == 0 && gYear % 100 != 0) || (gYear % 400 == 0)))
      ++g_day_no;
    g_day_no += gd;

    let j_day_no = g_day_no - 79;

    let j_np = Math.floor(j_day_no / 12053);
    j_day_no = j_day_no % 12053;

    let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
    j_day_no %= 1461;

    if (j_day_no >= 366) {
      jy += Math.floor((j_day_no - 1) / 365);
      j_day_no = (j_day_no - 1) % 365;
    }

    let jm = 0;
    for (let i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
      j_day_no -= j_days_in_month[i];
      jm++;
    }
    let jd = j_day_no + 1;

    return { jy, jm, jd };
  }

  const formatDateTime = (date: Date): string => {
    // Convert to Jalali
    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1; // getMonth() is 0-based
    const gDay = date.getDate();

    const { jy, jm, jd } = toJalali(gYear, gMonth, gDay);

    // Format time
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Format Jalali month and day with leading zeros
    const jalaliMonth = (jm + 1).toString().padStart(2, '0');
    const jalaliDay = jd.toString().padStart(2, '0');

    return `${jy}/${jalaliMonth}/${jalaliDay} ${hours}:${minutes}:${seconds}`;
  };

  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'jpg';
      case 'png':
        return 'png';
      case 'webp':
        return 'webp';
      default:
        return 'image';
    }
  };

  // Convert image to JPG format
  const convertToJpg = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx?.drawImage(img, 0, 0);

        // Convert to JPG
        canvas.toBlob((blob) => {
          if (blob) {
            const jpgFile = new File([blob], `${file.name.split('.')[0]}.jpg`, {
              type: 'image/jpg',
              lastModified: Date.now()
            });
            resolve(jpgFile);
          } else {
            reject(new Error('Failed to convert image to JPG'));
          }
        }, 'image/jpg', 0.9);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  // Compress image (iteratively adjust quality/size) to be <= maxBytes and return JPG
  // This function always outputs a JPG file, regardless of the input file type.
  // The output file will have a .jpg extension and MIME type 'image/jpeg'.
  const compressImageToMaxBytes = (file: File, maxBytes: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        let width = img.width;
        let height = img.height;
        let quality = 0.9;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const render = (): Promise<Blob> => new Promise((res, rej) => {
          canvas.width = width;
          canvas.height = height;
          ctx?.clearRect(0, 0, width, height);
          ctx?.drawImage(img, 0, 0, width, height);
          // Always output as JPEG
          canvas.toBlob((blob) => {
            if (blob) res(blob); else rej(new Error('Failed to compress image'));
          }, 'image/jpeg', quality);
        });

        try {
          let blob = await render();
          // Reduce quality/size until under threshold or limits reached
          while (blob.size > maxBytes && (quality > 0.6 || width > img.width * 0.4)) {
            if (quality > 0.6) quality -= 0.1;
            if (blob.size > maxBytes && width > img.width * 0.4) {
              width = Math.round(width * 0.9);
              height = Math.round(height * 0.9);
            }
            blob = await render();
          }

          // Always return a .jpg file with type 'image/jpeg'
          const output = new File([blob], `${file.name.split('.')[0]}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(output);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {



 
    const file = event.target.files?.[0];
    if (!file) {
      // User cancelled photo capture
      return;
    }

    onUploadStart?.();
    resetUploadState();
    startLoading();

    // Validate that it's an image file from camera
    if (!file.type.startsWith('image/')) {
      const msg = 'فقط تصاویر مجاز است';
      setLocalMessage({type : "error", message : msg});
      onUploadError?.(msg);
      stopLoading();
      return;
    }

    // convert the file here to the righ type
    let workingFile: File = file;

    // Compress to be <= threshold (default 5MB if not provided)
    const maxBytes = validSize ? parseInt(validSize) * 1024 : 3 * 1024 * 1024;
    const compressTarget = 0.01 * 1024 * 1024

    // console.log("workingFile.size", formatFileSize(workingFile.size))
    // console.log("maxBytes", maxBytes)

      try {
        workingFile = await compressImageToMaxBytes(workingFile, compressTarget);
        console.log("workingFile.size 2", formatFileSize(workingFile.size))
      } catch {
        const msg = 'عدم موفقیت در فشرده‌سازی تصویر';
        setLocalMessage({type : "error", message : msg});
        stopLoading();
        return;
      }
      if(workingFile.size > maxBytes) {
        const msg = 'حجم فایل باید حداکثر ' + formatFileSize(maxBytes) + '  باشد';
        setLocalMessage({type : "error", message : msg});
        onUploadError?.(msg);
        stopLoading();
        return;
      }

    setSelectedFile(workingFile);

    // Validate file using the hook
    const validation = validateFile(file);
    if (!validation.isValid) {
      const msg = validation.error || 'فایل نامعتبر است';
      setLocalMessage({type : "error", message : msg});
      stopLoading();
      return;
    }

    // Create photo preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(workingFile);


    try {
      // Ensure under threshold and jpg
      // const jpgFile = await compressImageToMaxBytes(workingFile, maxBytes);
      // console.log("jpgFile",jpgFile)

      if (type === 'front') {
        await uploadFrontImage(requestId, workingFile);
      } else {
        await uploadBackImage(requestId, workingFile);
      }
    
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'خطا در آپلود عکس';
      setLocalMessage({type : "error", message : msg});
      onUploadError?.(msg);
      stopLoading();
    }
  };

    // Re-upload same selected file
    const retryUploadCurrentFile = async () => {
      if (!selectedFile) return;
      onUploadStart?.();
      try {
        if (type === 'front') {
          await uploadFrontImage(requestId, selectedFile);
        } else {
          await uploadBackImage(requestId, selectedFile);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'خطا در آپلود مجدد عکس';
        setLocalMessage({ type: 'error', message: msg });
        onUploadError?.(msg);
      } finally {
        setBottomSheetState({ open: false, type: '' });
      }
    }

  useEffect(() => {
    if (uploadState.success && uploadState.data) {
      setLocalMessage({type : "success", message : uploadState.data.message});
      onUploadSuccess?.(uploadState.data);
    } else if (uploadState.error) {
      setLocalMessage({type : "error", message : uploadState.error});
      onUploadError?.(uploadState.error);
    }
  }, [uploadState]);

  // Show captured photo UI
  const progress = uploadState.isUploading ? uploadState.progress : 100;

  // Use existing image data or captured photo data
  const displayData = (selectedFile ? {
    file_name: selectedFile.name,
    size: selectedFile.size.toString(),
    date: formatDateTime(new Date())
  } : currentImageInfo);


  const [observerToggle, setObserverToggle] = useState<boolean>(false);
  const handleObserveImage = async () => {
    if (type === 'front') {
      const url = await downloadFrontImageUrl(requestId);
      return url;
    } else {
      const url = await downloadBackImageUrl(requestId);
      return url;
    }
  }


  const uploadStateHandler = () => {

    // idle
    // loading 
    // error
    // success

    if(uploadState.isUploading) {
      return "loading"
    }
    if(uploadState.error || localMessage.type === "error") {
      return "error"
    }
    // uploadState.success || selectedFile && localMessage.type !== "error"
    if(uploadState.success || displayData ) {
      return "success"
    }
    return "idle"
  }

  // first part
  const firstPartHandle = () => {
    return (
      <div className={styles.iconContainerStyle}>
        {displayData ? <DynamicIcons type="jpg" /> : <DynamicIcons type="broken_image" />}

        { displayData ?
          <>
            {/* File Details */}
            <div className={styles.fileDetails}>
              <Typography variant="titleSmall" className={styles.fileName} title={displayData?.file_name} style={{ direction: "ltr", textAlign: "right" }}>
                {displayData?.file_name?.length > 16
                  ? displayData.file_name.slice(0, 6) + '...' + displayData.file_name.slice(-8)
                  : displayData?.file_name}
              </Typography>
              <div className={styles.fileMeta}>
                <Typography variant="bodySmall" className={styles.fileDateTime}>
                  {currentImageInfo ? currentImageInfo.date : formatDateTime(new Date())}
                </Typography>
                <Typography variant="bodySmall" className={styles.separator}>
                  •
                </Typography>
                <Typography variant="bodySmall" className={styles.fileSize} style={{ direction: "ltr" }}>
                  {currentImageInfo ? currentImageInfo.size : formatFileSize(parseInt(displayData.size))}
                </Typography>
              </div>
            </div>
          </>
          :
          <Typography variant="titleSmall" style={{ color: 'var(--color-text-secondary)' }}>
            عکس برداری
          </Typography>
        }

      </div>
    )
  }

  // second part

  const secondPartHandle = () => {
  
    // =============== loading =============
    if (uploadStateHandler() === "loading") {
      return (
        <div className={styles.progressContainer}>
          <div className={styles.progressCircle}>
            <svg className={styles.progressSvg} viewBox="0 0 36 36">
              <path
                className={styles.progressBackground}
                d="M18 2.0845
      
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.progressBar}
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
      
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className={styles.progressIcon}>
              <div className={styles.loadingSpinner} />
            </div>
          </div>
        </div>
      )
    }

    if (uploadStateHandler() === "error") {
      return (
        <Button
          variant="text"  
          leftIcon={<DynamicIcons type="reload" style={{ color: "inherit" }} />}
          onClick={() => setBottomSheetState({ open: true, type: 'error' })}
          style = {{border : "3px solid #BA1A1A"}}
        >
        </Button>
        )
    }

      //  ================= success ====================
      if (uploadStateHandler() === "success" || displayData) {
        return (
          <Button
            variant="text"
            leftIcon={<DynamicIcons type="more_vert" style={{ color: "inherit" }} />}
            onClick={() => setBottomSheetState({ open: true, type: 'success' })}
          >
          </Button>
        )
      }

    return (
      <Button
        variant="text"  
        leftIcon={<DynamicIcons type="add_image" style={{ color: "inherit" }} />}
      >
      </Button>
    )
  }

  const bottomSheetHandler = () => {
    if (bottomSheetState.open && bottomSheetState.type === "success") {
      return (
        <BottomSheet isOpen={true} onClose={() => setBottomSheetState({ open: false, type: '' })}>
          <List
            items={[
              {
                id: 'observeImage',
                title: 'مشاهده',
                icon: <DynamicIcons type='visibility' style={{ color: "inherit" }} />,
                onClick: () => {
                  setObserverToggle(true);
                  setBottomSheetState({ open: false, type: '' })
                }
              },
              {
                id: 're-take-photo',
                title: 'عکس‌برداری مجدد',
                icon: <DynamicIcons type='add_image' style={{ color: "inherit" }} />,
                onClick: () => {
                  setAddImageModal(true);
                  setBottomSheetState({ open: false, type: '' })
                }
              },
            ]}
          />
        </BottomSheet>
      )
    }
    if (bottomSheetState.open && bottomSheetState.type === "error") {
      return (
        <BottomSheet isOpen={true} onClose={() => setBottomSheetState({ open: false, type: '' })}>
          <List
            items={[
              {
                id: 'uploadingAgain',
                title: 'آپلود مجدد',
                icon: <DynamicIcons type='arrow_upload_progress' style={{ color: "inherit" }} />,
                onClick: () => {
                  retryUploadCurrentFile();
                },
                disabled : localMessage.type === "error" && !uploadState.error ? true : false
              },
              {
                id: 're-take-photo',
                title: 'عکس‌برداری مجدد',
                icon: <DynamicIcons type='add_image' style={{ color: "inherit" }} />,
                onClick: () => {
                  setAddImageModal(true);
                  setBottomSheetState({ open: false, type: '' })
                }
              },
            ]}
          />
        </BottomSheet>
      )
    }

  }

  const modalHandler = () => {
    return (
      <>
          {/* Add Image again  */}
        <Modal
          isOpen={addImageModal}
          onClose={() => setAddImageModal(false)}
          title="عکس‌برداری مجدد"
          body='آیا می‌خواهید دوباره عکس‌برداری را انجام دهید؟'
          primaryAction={{
            label: "عکس‌برداری",
            onClick: () => {
              setAddImageModal(false);
              handleTakePhoto();
            }
          }}
          secondaryAction={{
            label: "انصراف",
            onClick: () => setAddImageModal(false)
          }}
        />

        {/* Access Camera Modal */}
        <Modal
          isOpen={accessCameraModal}
          onClose={() => setAccessCameraModal(false)}
          icon = {<DynamicIcons type="videocam" style={{ color: "inherit" }} />}
          title="دسترسی به دوربین"
          body={accessCameraModalReason}
          primaryAction={{
            label: "عکس‌برداری",
            onClick: () => {
              setAccessCameraModal(false);
              openPicker(true);
            }
          }}
          secondaryAction={{
            label: "انصراف",
            onClick: () => setAccessCameraModal(false)
          }}
        />


      </>
    )

  }

  const onClickHandler = () => {
    if (uploadStateHandler() === "loading") return
    if (uploadStateHandler() === "error") {
      setBottomSheetState({ open: true, type: 'error' });
      return;
    }
    if (uploadStateHandler() === "success") {
      setBottomSheetState({ open: true, type: 'success' });
      return;
    }
    handleTakePhoto();
  }


  const messageColorHandler = () => {
    return localMessage.type === "error" ? 'var(--color-error)' : localMessage.type === "warning" ? 'var(--color-warning)' : localMessage.type === "info" ? 'var(--color-info)' : 'var(--color-success)';
  }

  const boxStyleHandler = () => {

    if (uploadStateHandler() === "loading") {
      return {
        backgroundColor: 'var(--color-background)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-4)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }
    }
    if (uploadStateHandler() === "success") {
      return {
        border: '1px solid var(--color-border)',
      }
    }
    if(uploadStateHandler() === "error") {
      return {
        border: '1px solid var(--color-error)',
      }
    }
    return {
      backgroundColor: 'var(--color-background)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--spacing-4)',
      border: '1px dashed var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    }
  }

  // Show photo capture box if no existing image and no photo taken
  return (
    <div className={styles.container}>

      <div className={styles.boxBaseStyle} onClick={onClickHandler} style={{...boxStyleHandler()}}>
        {firstPartHandle()}
        {secondPartHandle()}
      </div>


      {localMessage.message && (
        <Typography variant="bodySmall" style={{ color: messageColorHandler(), paddingRight: "16px" }}>
          {localMessage.message}
        </Typography>
      )}

      {bottomSheetHandler()}
      {modalHandler()}

      <ImagePreview srcLoader={async () => await handleObserveImage()} isOpen={observerToggle} onClose={() => { setObserverToggle(false) }} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        aria-label="Take photo with camera"
        multiple={false}
        data-capture="environment"
      />
    </div>
  );
};

export default ChequeUploadScreenUpload;
