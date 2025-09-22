import { apiClient } from '@/services';
import { AxiosResponse } from 'axios';

// Types for API responses
export interface ImageUploadSuccessResponse {
  data: {
    request_id: string;
    file_name: string;
    size: string;
    date: string;
  };
  message: string;
}

export interface ImageUploadErrorResponse {
  error_code: string;
  error_message: string;
  retryable: boolean;
  error_details: any;
  message : string
}

export type ImageUploadResponse = any;

// Upload progress callback type
export type UploadProgressCallback = (progress: number) => void;

// Service class for image uploads
export class ImageUploadService {

  /**
   * Upload front image with progress tracking
   */
  async uploadFrontImage(
    requestId: string,
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<ImageUploadResponse> {
    return this.uploadImage(
      `cqms/api/v1/images/${requestId}/front-upload`,
      file,
      onProgress
    );
  }

  /**
   * Upload back image with progress tracking
   */
  async uploadBackImage(
    requestId: string,
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<ImageUploadResponse> {
    return this.uploadImage(
      `cqms/api/v1/images/${requestId}/back-upload`,
      file,
      onProgress
    );
  }

  /**
   * Generic image upload method with progress tracking
   */
  private async uploadImage(
    endpoint: string,
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<ImageUploadResponse> {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Use axios with progress tracking
      const response: AxiosResponse<any> = await apiClient.post(
        endpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(progress);
            }
          }
        }
      );

      return response;
    } catch (error: any) {
        throw error
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File): { isValid: boolean; error?: string } {
    // // Check file size (3MB limit)
    // const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    // if (file.size > maxSize) {
    //   return {
    //     isValid: false,
    //     error: 'حجم فایل بارگذاری شده بیشتر از حد مجاز است'
    //   };
    // }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error:  "فرمت عکس پشتیبانی نمی‌شود."
      };
    }

    return { isValid: true };
  }

  /**
   * Get file size in human readable format
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Export singleton instance
export const imageUploadService = new ImageUploadService();
