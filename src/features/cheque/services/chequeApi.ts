import { apiClient } from '@/services';
import { AxiosResponse } from 'axios';
import { Cheque, ChequeFormData, ChequeFilters, ChequeStats } from '../types/cheque.types';

export interface ChequeListResponse {
  cheques: Cheque[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ChequeDetailResponse { cheque: Cheque }
export interface ChequeCreateResponse { cheque: Cheque; message: string }
export interface ChequeUpdateResponse { cheque: Cheque; message: string }
export interface ChequeDeleteResponse { message: string; deletedId: number }
export interface DocumentUploadResponse { documentId: string; filename: string; size: number; message: string }

// Image info types
export interface ImageInfo {
  file_name: string;
  size: string;
  date: string;
}

export interface ImageInfoResponse {
  data: {
    request_id: string;
    valid_size: string;
    front_image: ImageInfo | null;
    back_image: ImageInfo | null;
    info: string[];
  };
  message: string | null;
}

// New: Step Inquiry response (shape may vary; keep generic with index signature)
export interface StepInquiryResponse {
  [key: string]: any;
}

// New: Cheque Init Request payload
export interface ChequeInitRequestPayload {
  sub_system_id: string;
  facility_amount: number;
  guarantee_amount: number;
  installment_duration: string;
  installment_amount: number;
  due_date: string;
}

// New: Step inquiry by request id
export const getStepInquiry = async (requestId: string): Promise<any> => {
  const response = await apiClient.get(`cqms/api/v1/requests/${requestId}/step-inquiry`);
  return response.data;
};

// New: Initialize cheque request
export const initChequeRequest = async (payload: {
  sub_system_id: string;
  facility_amount: number;
  guarantee_amount: number;
  installment_duration: string;
  installment_amount: number;
  due_date: string;
}): Promise<any> => {
  const response = await apiClient.post('cqms/api/v1/requests/init', payload);
  return response.data;
};

// New: Get accounts list for a request
export const getAccountsList = async (requestId: string): Promise<any> => {
  const response = await apiClient.get(`cqms/api/v1/accounts/${requestId}/list`);
  return response.data;
};

// New: Add/Select an account for a request
export const addAccount = async (payload: {
  request_id: string;
  account: string;
}): Promise<any> => {
  const response = await apiClient.put('cqms/api/v1/accounts/add', payload);
  return response.data;
};

// New: Get chequebooks list for a request
export const getChequebooksList = async (requestId: string): Promise<any> => {
  const response = await apiClient.get(`cqms/api/v1/chequebooks/${requestId}/list`);
  return response.data;
};

// New: Add/Select a chequebook for a request
export const addChequebook = async (payload: {
  request_id: string;
  from_serial: string;
  to_serial: string;
  seri: string;
}): Promise<any> => {
  const response = await apiClient.put('cqms/api/v1/chequebooks/add', payload);
  return response.data;
};

// New: Get cheque sheets list for a chequebook
export const getChequeSheetsList = async (payload: {
  request_id: string;
  from_serial: string;
  to_serial: string;
}): Promise<any> => {
  const response = await apiClient.post('cqms/api/v1/cheques/list', payload);
  return response.data;
};

// New: Get cheque status
export const getChequeStatus = async (payload: {
  request_id: string;
  due_date: string;
  amount: string;
  beneficiary_id: string;
  beneficiary_name: string;
}): Promise<any> => {
  const response = await apiClient.post('cqms/api/v1/requests/compare', payload);
  return response.data;
};

// New: Internal add cheque (select a cheque sheet)
export const internalAddCheque = async (payload: {
  request_id: string;
  serial: string;
  sayad: string;
  issued: boolean;
}): Promise<any> => {
  const response = await apiClient.put('cqms/api/v1/cheques/internal-add', payload);
  return response.data;
};

// New: Get image info for a request
export const getUploadImagesInfo = async (requestId: string): Promise<ImageInfoResponse> => {
  const response = await apiClient.get(`cqms/api/v1/images/${requestId}/info`);
  return response.data;
};


// Download front image and return an object URL
export const downloadFrontImageUrl = async (requestId: string): Promise<string> => {
  const response = await apiClient.get(`cqms/api/v1/images/${requestId}/front-download`, {
    responseType: 'blob',
  });
  const blob = response.data as Blob;
  return URL.createObjectURL(blob);
};


// Download back image and return an object URL
export const downloadBackImageUrl = async (requestId: string): Promise<string> => {
  const response = await apiClient.get(`cqms/api/v1/images/${requestId}/back-download`, {
    responseType: 'blob',
  });
  const blob = response.data as Blob;
  return URL.createObjectURL(blob);
};

// PUT /v1/requests/{requestId}/back
export const updateBackRequest = async (requestId: string): Promise<any> => {
  const response = await apiClient.put(`cqms/api/v1/requests/${requestId}/back`);
  return response.data;
};
// GET /v1/requests/{requestId}/subsystem-requirements
export interface SubsystemRequirementsResponse {
  data: {
    request_id: string;
    beneficiary_id: string;
    beneficiary_name: string;
    due_date: string;
    due_date_string: string;
    amount: number;
    amount_string: string;
    info: string[];
  };
  message: string | null;
}

export const getSubsystemRequirements = async (requestId: string): Promise<SubsystemRequirementsResponse> => {
  const response = await apiClient.get(`cqms/api/v1/requests/${requestId}/subsystem-requirements`);
  return response.data;
};

// POST /v1/images/{requestId}/send
export interface SendImageResponse {
  data: {
    request_id: string;
  };
  message: string;
}
export const sendImage = async (requestId: string): Promise<SendImageResponse> => {
  const response = await apiClient.put(`cqms/api/v1/images/${requestId}/send`);
  return response.data;
};

// New: Internal cheque Detail (after )
export const getInternalChequeDetail = async (requestId: string): Promise<any> => {
  const response = await apiClient.get(`cqms/api/v1/cheques/${requestId}/internal-detail`);
  return response.data;
};

// New: Put cheque confirm (select a cheque sheet)
export const putIssue = async (request_id: string): Promise<any> => {
  const response = await apiClient.put(`cqms/api/v1/cheques/${request_id}/issue`);
  return response.data;
};

// New: Delivery info
export const getDeliveryInfo = async (requestId: string): Promise<any> => {
  const response = await apiClient.get(`cqms/api/v1/requests/${requestId}/delivery-info`);
  return response.data;
};

// New: External cheque Detail
export const getExternalChequeDetail = async (requestId: string): Promise<any> => {
  const response = await apiClient.get(`cqms/api/v1/cheques/${requestId}/external-detail`);
  return response.data;
};

// New: Put external issue
export const externalIssue = async (request_id: string): Promise<any> => {
  const response = await apiClient.put(`cqms/api/v1/cheques/${request_id}/external-issue`);
  return response.data;
};

// New: Post external inquiry
export const postExternalInquiry = async (payload: {
  request_id: string;
  sayad: string;
}): Promise<any> => {
  const response = await apiClient.post('cqms/api/v1/cheques/external-inquiry', payload);
  return response.data;
};

// New: Confirm external cheque data
export const putExternalAdd = async (payload: {
  request_id: string;
  sayad: string;
  issued: boolean;
}): Promise<any> => {
  const response = await apiClient.put('cqms/api/v1/cheques/external-add', payload);
  return response.data;
};

