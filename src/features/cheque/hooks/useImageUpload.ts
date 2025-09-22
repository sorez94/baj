import { useState, useCallback } from 'react';
import { 
  imageUploadService, 
  ImageUploadResponse, 
  ImageUploadSuccessResponse, 
  ImageUploadErrorResponse 
} from '../services/imageUploadService';

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
  data: any | null;
}

export interface UseImageUploadReturn {
  uploadState: UploadState;
  uploadFrontImage: (requestId: string, file: File) => Promise<void>;
  uploadBackImage: (requestId: string, file: File) => Promise<void>;
  resetUploadState: () => void;
  validateFile: (file: File) => { isValid: boolean; error?: string };
  startLoading: () => void;
  stopLoading: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
    data: null,
  });

  const resetUploadState = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      success: false,
      data: null,
    });
  }, []);

  const startLoading = useCallback(() => {
    setUploadState(prev => ({
      ...prev,
      isUploading: true,
    }));
  }, []);

  const stopLoading = useCallback(() => {
    setUploadState(prev => ({
      ...prev,
      isUploading: false,
    }));
  }, []);

  const handleUpload = useCallback(async (
    uploadFunction: (requestId: string, file: File, onProgress?: (progress: number) => void) => Promise<ImageUploadResponse>,
    requestId: string,
    file: File
  ) => {
    // Validate file first
    const validation = imageUploadService.validateFile(file);
    if (!validation.isValid) {
      setUploadState(prev => ({
        ...prev,
        error: validation.error || 'فایل نامعتبر است',
        isUploading: false,
      }));
      return;
    }

    // Reset state and start upload
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      success: false,
      data: null,
    });

    try {
      const response = await uploadFunction(requestId, file, (progress) => {
        setUploadState(prev => ({
          ...prev,
          progress,
        }));
      });

      // Check if response is success or error
      if (response.status === 200 && response.data) {
        // Success response
        setUploadState({
          isUploading: false,
          progress: 100,
          error: null,
          success: true,
          data: response.data,
        });
      } else {
        // Error response
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          error: response.message,
        }));
      }
    } catch (error: any) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: error.message,
      }));
    }
  }, []);

  const uploadFrontImage = useCallback(async (requestId: string, file: File) => {
    await handleUpload(imageUploadService.uploadFrontImage.bind(imageUploadService), requestId, file);
  }, [handleUpload]);

  const uploadBackImage = useCallback(async (requestId: string, file: File) => {
    await handleUpload(imageUploadService.uploadBackImage.bind(imageUploadService), requestId, file);
  }, [handleUpload]);

  const validateFile = useCallback((file: File) => {
    return imageUploadService.validateFile(file);
  }, []);

  return {
    uploadState,
    uploadFrontImage,
    uploadBackImage,
    resetUploadState,
    validateFile,
    startLoading,
    stopLoading,
  };
};
