import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  initChequeRequest,
  getStepInquiry,
  getAccountsList,
  addAccount,
  getChequebooksList,
  addChequebook,
  getChequeSheetsList,
  internalAddCheque,
  getChequeStatus,
  getUploadImagesInfo,
  ImageInfoResponse,
  ImageInfo,
  updateBackRequest,
  getSubsystemRequirements,
  SubsystemRequirementsResponse,
  sendImage,
  SendImageResponse,
  getExternalChequeDetail,
  getInternalChequeDetail,
  getDeliveryInfo,
  externalIssue,
  putIssue, postExternalInquiry, putExternalAdd
} from '@/features/cheque';

// Journey step values from API
export type ChequeStep =
  | 'INIT'
  | 'UPLOAD'
  | 'SEND_IMAGE'
  | 'CONFIRM_IMAGE'
  | 'REJECT_IMAGE'
  | 'EXTERNAL_ISSUE'
  | 'INTERNAL_ISSUE'
  | 'READY_FOR_DELIVERY'
  | 'DELIVERY'
  | 'REJECT_PHYSIC'
  | 'CONFIRM_PHYSIC';

// Screen types for different UI states
export type ChequeScreen =
  | 'chequeStartScreen'           // Initial screen
  | 'chequeAccountsScreen'        // Form to fill
  | 'chequeCheckbooksScreen'      // Document upload
  | 'chequeSheetsScreen'          // Cheque sheets screen
  | 'chequeScreen'                // Cheque Status (compare)
  | 'chequeUploadScreen'          // Upload screen
  | 'chequeConfirmScreen'
  | 'chequeDeliveryScreen'
  | 'chequeBankConfirmationScreen'// Bank confirm cheque
  | 'chequeDeliveryInfoScreen'    // Deliver your cheque to bank
  | 'chequeExternalInquiryScreen' // external bank inquiry
  | 'chequeSayadExternal'         // external bank Sayad

// Async Thunk for initChequeRequest
export const initChequeRequestThunk = createAsyncThunk<
  any,
  {
    sub_system_id: string;
    facility_amount: number;
    guarantee_amount: number;
    installment_duration: string;
    installment_amount: number;
    due_date: string;
  },
  { rejectValue: any }
>(
  'cheque/initChequeRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await initChequeRequest(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for getStepInquiry
export const getStepInquiryThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: any }
>(
  'cheque/getStepInquiry',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await getStepInquiry(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for getAccountsList
export const getAccountsListThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/getAccountsList',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await getAccountsList(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Add/Select account
export const addAccountThunk = createAsyncThunk<
  any,
  { request_id: string; account: any },
  { rejectValue: any }
>(
  'cheque/addAccount',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addAccount(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Get chequebooks list
export const getChequebooksListThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/getChequebooksList',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await getChequebooksList(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Add/Select chequebook
export const addChequebookThunk = createAsyncThunk<
  any,
  { request_id: string; from_serial: string; to_serial: string; seri: string },
  { rejectValue: any }
>(
  'cheque/addChequebook',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addChequebook(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Get cheque sheets list
export const getChequeSheetsListThunk = createAsyncThunk<
  any,
  { request_id: string; from_serial: string; to_serial: string },
  { rejectValue: any }
>(
  'cheque/getChequeSheetsList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getChequeSheetsList(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Get cheque status
export const getChequeStatusThunk = createAsyncThunk<
  any,
  { request_id: string;
    due_date: string;
    amount: string;
    beneficiary_id: string;
    beneficiary_name: string; },
  { rejectValue: any }
>(
  'cheque/getChequeStatusList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getChequeStatus(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Internal add cheque (select a cheque sheet)
export const internalAddChequeThunk = createAsyncThunk<
  any,
  { request_id: string; serial: string; sayad: string; issued: boolean },
  { rejectValue: any }
>(
  'cheque/internalAddCheque',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await internalAddCheque(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUploadImagesInfoThunk = createAsyncThunk<
  ImageInfoResponse,
  string,
  { rejectValue: any }
>(
  'cheque/getUploadImagesInfo',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await getUploadImagesInfo(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: PUT /requests/{id}/back
export const updateBackRequestThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: any }
>(
  'cheque/updateBackRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await updateBackRequest(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: GET /requests/{id}/subsystem-requirements
export const getSubsystemRequirementsThunk = createAsyncThunk<
  SubsystemRequirementsResponse,
  string,
  { rejectValue: any }
>(
  'cheque/getSubsystemRequirements',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await getSubsystemRequirements(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: POST /images/{id}/send
export const sendImageThunk = createAsyncThunk<
  SendImageResponse,
  string,
  { rejectValue: any }
>(
  'cheque/sendImage',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await sendImage(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for getInternalChequeDetail
export const getInternalChequeDetailThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/getInternalChequeDetail',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await getInternalChequeDetail(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Put cheque confirmation
export const putIssueThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/putIssue',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await putIssue(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for getDeliveryInfo
export const getDeliveryInfoThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/getDeliveryInfo',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await getDeliveryInfo(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for getExternalChequeDetail
export const getExternalChequeDetailThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/getExternalChequeDetail',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await getExternalChequeDetail(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Put external issue
export const externalIssueThunk = createAsyncThunk<
  any,
  { requestId: string },
  { rejectValue: any }
>(
  'cheque/externalIssue',
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await externalIssue(requestId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: add external inquiry
export const postExternalInquiryThunk = createAsyncThunk<
  any,
  { request_id: string; sayad: string},
  { rejectValue: any }
>(
  'cheque/postExternalInquiry',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postExternalInquiry(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Thunk: Confirm external cheque data
export const putExternalAddThunk = createAsyncThunk<
  any,
  { request_id: string; sayad: string, issued: boolean},
  { rejectValue: any }
>(
  'cheque/putExternalAdd',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await putExternalAdd(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Basic State Interface
export interface ChequeState {
  // Journey Management
  step: ChequeStep;
  screen: ChequeScreen;

  chequeScreen : {
    screen: "guidance" | "upload" | "success";
  }
  // API States
  api: {
    initChequeRequest: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    getStepInquiry: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    accountsList: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    addAccount: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    chequebooksList: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    addChequebook: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    getChequeSheetsList: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    getChequeStatus: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    internalAddCheque: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    getUploadImagesInfo: {
      isLoading: boolean;
      error: any | null;
      data: ImageInfoResponse | null;
      lastFetched: string | null;
    };
    updateBackRequest: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    subsystemRequirements: {
      isLoading: boolean;
      error: any | null;
      data: SubsystemRequirementsResponse | null;
      lastFetched: string | null;
    };
    sendImage: {
      isLoading: boolean;
      error: any | null;
      data: SendImageResponse | null;
      lastFetched: string | null;
    };
    getInternalChequeDetail: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    putIssue: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    getDeliveryInfo: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    getExternalChequeDetail: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    externalIssue: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    postExternalInquiry: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
    putExternalAdd: {
      isLoading: boolean;
      error: any | null;
      data: any;
      lastFetched: string | null;
    };
  };
}

// Initial State
const initialState: ChequeState = {
  // Journey starts at INIT step and start screen
  step: 'INIT',
  screen: 'chequeStartScreen',

  chequeScreen : {
    screen: "guidance",
  },

  api: {
    initChequeRequest: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getStepInquiry: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    accountsList: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    addAccount: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    chequebooksList: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    addChequebook: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getChequeSheetsList: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getChequeStatus: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    internalAddCheque: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getUploadImagesInfo: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    updateBackRequest: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    subsystemRequirements: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    sendImage: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getInternalChequeDetail: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    putIssue: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getDeliveryInfo: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    getExternalChequeDetail: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    externalIssue: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    postExternalInquiry: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
    putExternalAdd: {
      isLoading: false,
      error: null,
      data: null,
      lastFetched: null,
    },
  },
};

// Cheque Slice
const chequeSlice = createSlice({
  name: 'cheque',
  initialState,
  reducers: {
    // Journey Management Actions
    setStep: (state, action: PayloadAction<ChequeStep>) => {
      state.step = action.payload;
    },
    setScreen: (state, action: PayloadAction<ChequeScreen>) => {
      state.screen = action.payload;
    },
    nextStep: (state) => {
      // Logic to determine next step based on current step
      const stepOrder: ChequeStep[] = [
        'INIT',
        'UPLOAD', 
        'SEND_IMAGE',
        'CONFIRM_IMAGE',
        'READY_FOR_DELIVERY',
        'DELIVERY',
        'CONFIRM_PHYSIC'
      ];
      const currentIndex = stepOrder.indexOf(state.step);
      if (currentIndex < stepOrder.length - 1) {
        state.step = stepOrder[currentIndex + 1];
      }
    },
    previousStep: (state) => {
      // Logic to determine previous step
      const stepOrder: ChequeStep[] = [
        'INIT',
        'UPLOAD',
        'SEND_IMAGE', 
        'CONFIRM_IMAGE',
        'READY_FOR_DELIVERY',
        'DELIVERY',
        'CONFIRM_PHYSIC'
      ];
      const currentIndex = stepOrder.indexOf(state.step);
      if (currentIndex > 0) {
        state.step = stepOrder[currentIndex - 1];
      }
    },
    nextScreen: (state) => {
      // Logic to determine next screen based on current screen
      const screenOrder: ChequeScreen[] = ['chequeStartScreen', 'chequeSayadExternal', 'chequeAccountsScreen', 'chequeCheckbooksScreen', 'chequeSheetsScreen', 'chequeScreen', 'chequeUploadScreen', 'chequeConfirmScreen', 'chequeDeliveryScreen'];
      const currentIndex = screenOrder.indexOf(state.screen);
      if (currentIndex < screenOrder.length - 1) {
        state.screen = screenOrder[currentIndex + 1];
      }
    },
    previousScreen: (state) => {
      // Logic to determine previous screen
      const screenOrder: ChequeScreen[] = ['chequeStartScreen', 'chequeSayadExternal', 'chequeAccountsScreen', 'chequeCheckbooksScreen', 'chequeSheetsScreen', 'chequeScreen', 'chequeUploadScreen', 'chequeConfirmScreen', 'chequeDeliveryScreen'];
      const currentIndex = screenOrder.indexOf(state.screen);
      if (currentIndex > 0) {
        state.screen = screenOrder[currentIndex - 1];
      }
    },

    // upload screen actions
    setChequeScreen: (state, action: PayloadAction<"guidance" | "upload" | "success">) => {
      state.chequeScreen.screen = action.payload;
    },
    
    // Basic actions can go here
    clearInitChequeData: (state) => {
      state.api.initChequeRequest.data = null;
      state.api.initChequeRequest.error = null;
    },
    clearStepInquiryData: (state) => {
      state.api.getStepInquiry.data = null;
      state.api.getStepInquiry.error = null;
    },
    clearAccountsListData: (state) => {
      state.api.accountsList.data = null;
      state.api.accountsList.error = null;
    },
    clearAddAccountData: (state) => {
      state.api.addAccount.data = null;
      state.api.addAccount.error = null;
    },
    clearChequebooksListData: (state) => {
      state.api.chequebooksList.data = null;
      state.api.chequebooksList.error = null;
    },
    clearAddChequebookData: (state) => {
      state.api.addChequebook.data = null;
      state.api.addChequebook.error = null;
    },
    clearChequeSheetsListData: (state) => {
      state.api.getChequeSheetsList.data = null;
      state.api.getChequeSheetsList.error = null;
    },
    clearChequeStatusData: (state) => {
      state.api.getChequeStatus.data = null;
      state.api.getChequeStatus.error = null;
    },
    clearInternalAddChequeData: (state) => {
      state.api.internalAddCheque && (state.api.internalAddCheque.data = null);
      state.api.internalAddCheque && (state.api.internalAddCheque.error = null);
    },
    clearUploadImagesInfo: (state) => {
      state.api.getUploadImagesInfo.data = null;
      state.api.getUploadImagesInfo.error = null;
    },
    clearSendImageData: (state) => {
      state.api.sendImage.data = null;
      state.api.sendImage.error = null;
    },
    clearExternalInquiryData: (state) => {
      state.api.postExternalInquiry.data = null;
      state.api.postExternalInquiry.error = null;
    },
    clearExternalAddData: (state) => {
      state.api.putExternalAdd.data = null;
      state.api.putExternalAdd.error = null;
    },
    clearBackData : (state) => {
      state.api.updateBackRequest.data = null;
      state.api.updateBackRequest.error = null;
    },
    clearInternalChequeDetailData: (state) => {
      state.api.getInternalChequeDetail.data = null;
      state.api.getInternalChequeDetail.error = null;
    },
    clearIssueData: (state) => {
      state.api.putIssue.data = null;
      state.api.putIssue.error = null;
    },
    clearDeliveryInfoData: (state) => {
      state.api.getDeliveryInfo.data = null;
      state.api.getDeliveryInfo.error = null;
    },
    clearExternalChequeDetailData: (state) => {
      state.api.getExternalChequeDetail.data = null;
      state.api.getExternalChequeDetail.error = null;
    },
    clearExternalIssue: (state) => {
      state.api.externalIssue.data = null;
      state.api.externalIssue.error = null;
    },
    clearAllApiStates: (state) => {
      // Clear all API states
      state.api.initChequeRequest.data = null;
      state.api.initChequeRequest.error = null;
      state.api.getStepInquiry.data = null;
      state.api.getStepInquiry.error = null;
      state.api.accountsList.data = null;
      state.api.accountsList.error = null;
      state.api.addAccount.data = null;
      state.api.addAccount.error = null;
      state.api.chequebooksList.data = null;
      state.api.chequebooksList.error = null;
      state.api.addChequebook.data = null;
      state.api.addChequebook.error = null;
      state.api.getChequeSheetsList.data = null;
      state.api.getChequeSheetsList.error = null;
      state.api.getChequeStatus.data = null;
      state.api.getChequeStatus.error = null;
      state.api.getInternalChequeDetail.data = null;
      state.api.getInternalChequeDetail.error = null;
      state.api.getExternalChequeDetail.data = null;
      state.api.getExternalChequeDetail.error = null;
      state.api.getDeliveryInfo.data = null;
      state.api.getDeliveryInfo.error = null;
      state.api.putIssue.data = null;
      state.api.putIssue.error = null;
      state.api.externalIssue.data = null;
      state.api.externalIssue.error = null;
      state.api.postExternalInquiry.data = null;
      state.api.postExternalInquiry.error = null;;
      state.api.putExternalAdd.data = null;
      state.api.putExternalAdd.error = null;
      state.api.internalAddCheque && (state.api.internalAddCheque.data = null);
      state.api.internalAddCheque && (state.api.internalAddCheque.error = null);
      state.api.getUploadImagesInfo.data = null;
      state.api.getUploadImagesInfo.error = null;
      state.api.sendImage.data = null;
      state.api.sendImage.error = null;
      state.api.updateBackRequest.data = null;
      state.api.updateBackRequest.error = null;
    },
    clearAll : (state) => {
      // Reset to initial state properly
      return initialState;
    }
  },
  extraReducers: (builder) => {
    // initChequeRequest
    builder
      .addCase(initChequeRequestThunk.pending, (state) => {
        state.api.initChequeRequest.isLoading = true;
        state.api.initChequeRequest.error = null;
      })
      .addCase(initChequeRequestThunk.fulfilled, (state, action) => {
        state.api.initChequeRequest.isLoading = false;
        state.api.initChequeRequest.data = action.payload;
        state.api.initChequeRequest.lastFetched = new Date().toISOString();
        state.api.initChequeRequest.error = null;
      })
      .addCase(initChequeRequestThunk.rejected, (state, action) => {
        state.api.initChequeRequest.isLoading = false;
        const payload: any = action.payload;
        state.api.initChequeRequest.error = action.payload;
        state.api.initChequeRequest.data = null;
      });
    // getStepInquiry
    builder
      .addCase(getStepInquiryThunk.pending, (state) => {
        state.api.getStepInquiry.isLoading = true;
        state.api.getStepInquiry.error = null;
      })
      .addCase(getStepInquiryThunk.fulfilled, (state, action) => {
        state.api.getStepInquiry.isLoading = false;
        state.api.getStepInquiry.data = action.payload;
        state.api.getStepInquiry.lastFetched = new Date().toISOString();
        state.api.getStepInquiry.error = null;
      })
      .addCase(getStepInquiryThunk.rejected, (state, action) => {
        state.api.getStepInquiry.isLoading = false;
        const payload: any = action.payload;
        state.api.getStepInquiry.error = action.payload
        state.api.getStepInquiry.data = null;
      });
    // getAccountsList
    builder
      .addCase(getAccountsListThunk.pending, (state) => {
        state.api.accountsList.isLoading = true;
        state.api.accountsList.error = null;
      })
      .addCase(getAccountsListThunk.fulfilled, (state, action) => {
        state.api.accountsList.isLoading = false;
        state.api.accountsList.data = action.payload;
        state.api.accountsList.lastFetched = new Date().toISOString();
        state.api.accountsList.error = null;
      })
      .addCase(getAccountsListThunk.rejected, (state, action) => {
        state.api.accountsList.isLoading = false;
        state.api.accountsList.error = action.payload;
        state.api.accountsList.data = null;
      });
    // addAccount
    builder
      .addCase(addAccountThunk.pending, (state) => {
        state.api.addAccount.isLoading = true;
        state.api.addAccount.error = null;
      })
      .addCase(addAccountThunk.fulfilled, (state, action) => {
        state.api.addAccount.isLoading = false;
        state.api.addAccount.data = action.payload;
        state.api.addAccount.lastFetched = new Date().toISOString();
        state.api.addAccount.error = null;
      })
      .addCase(addAccountThunk.rejected, (state, action) => {
        state.api.addAccount.isLoading = false;
        state.api.addAccount.error = action.payload;
        state.api.addAccount.data = null;
      });
    // getChequebooksList
    builder
      .addCase(getChequebooksListThunk.pending, (state) => {
        state.api.chequebooksList.isLoading = true;
        state.api.chequebooksList.error = null;
      })
      .addCase(getChequebooksListThunk.fulfilled, (state, action) => {
        state.api.chequebooksList.isLoading = false;
        state.api.chequebooksList.data = action.payload;
        state.api.chequebooksList.lastFetched = new Date().toISOString();
        state.api.chequebooksList.error = null;
      })
      .addCase(getChequebooksListThunk.rejected, (state, action) => {
        state.api.chequebooksList.isLoading = false;
        state.api.chequebooksList.error = action.payload;
        state.api.chequebooksList.data = null;
      });
    // addChequebook
    builder
      .addCase(addChequebookThunk.pending, (state) => {
        state.api.addChequebook.isLoading = true;
        state.api.addChequebook.error = null;
      })
      .addCase(addChequebookThunk.fulfilled, (state, action) => {
        state.api.addChequebook.isLoading = false;
        state.api.addChequebook.data = action.payload;
        state.api.addChequebook.lastFetched = new Date().toISOString();
        state.api.addChequebook.error = null;
      })
      .addCase(addChequebookThunk.rejected, (state, action) => {
        state.api.addChequebook.isLoading = false;
        state.api.addChequebook.error = action.payload;
        state.api.addChequebook.data = null;
      });
    // getChequeSheetsList
    builder
      .addCase(getChequeSheetsListThunk.pending, (state) => {
        state.api.getChequeSheetsList.isLoading = true;
        state.api.getChequeSheetsList.error = null;
      })
      .addCase(getChequeSheetsListThunk.fulfilled, (state, action) => {
        state.api.getChequeSheetsList.isLoading = false;
        state.api.getChequeSheetsList.data = action.payload;
        state.api.getChequeSheetsList.lastFetched = new Date().toISOString();
        state.api.getChequeSheetsList.error = null;
      })
      .addCase(getChequeSheetsListThunk.rejected, (state, action) => {
        state.api.getChequeSheetsList.isLoading = false;
        state.api.getChequeSheetsList.error = action.payload;
        state.api.getChequeSheetsList.data = null;
      });
    // getChequeStatus
    builder
      .addCase(getChequeStatusThunk.pending, (state) => {
        state.api.getChequeStatus.isLoading = true;
        state.api.getChequeStatus.error = null;
      })
      .addCase(getChequeStatusThunk.fulfilled, (state, action) => {
        state.api.getChequeStatus.isLoading = false;
        state.api.getChequeStatus.data = action.payload;
        state.api.getChequeStatus.lastFetched = new Date().toISOString();
        state.api.getChequeStatus.error = null;
      })
      .addCase(getChequeStatusThunk.rejected, (state, action) => {
        state.api.getChequeStatus.isLoading = false;
        state.api.getChequeStatus.error = action.payload;
        state.api.getChequeStatus.data = null;
      });
    // internalAddCheque
    builder
      .addCase(internalAddChequeThunk.pending, (state) => {
        if (state.api.internalAddCheque) {
          state.api.internalAddCheque.isLoading = true;
          state.api.internalAddCheque.error = null;
        }
      })
      .addCase(internalAddChequeThunk.fulfilled, (state, action) => {
        if (state.api.internalAddCheque) {
          state.api.internalAddCheque.isLoading = false;
          state.api.internalAddCheque.data = action.payload;
          state.api.internalAddCheque.lastFetched = new Date().toISOString();
          state.api.internalAddCheque.error = null;
        }
      })
      .addCase(internalAddChequeThunk.rejected, (state, action) => {
        if (state.api.internalAddCheque) {
          state.api.internalAddCheque.isLoading = false;
          state.api.internalAddCheque.error = action.payload;
          state.api.internalAddCheque.data = null;
        }
      })
    // getImageInfo
    builder
      .addCase(getUploadImagesInfoThunk.pending, (state) => {
        state.api.getUploadImagesInfo.isLoading = true;
        state.api.getUploadImagesInfo.error = null;
      })
      .addCase(getUploadImagesInfoThunk.fulfilled, (state, action) => {
        state.api.getUploadImagesInfo.isLoading = false;
        state.api.getUploadImagesInfo.data = action.payload;
        state.api.getUploadImagesInfo.lastFetched = new Date().toISOString();
        state.api.getUploadImagesInfo.error = null;
      })
      .addCase(getUploadImagesInfoThunk.rejected, (state, action) => {
        state.api.getUploadImagesInfo.isLoading = false;
        state.api.getUploadImagesInfo.error = action.payload;
        state.api.getUploadImagesInfo.data = null;
      })
      // updateBackRequest
      .addCase(updateBackRequestThunk.pending, (state) => {
        state.api.updateBackRequest.isLoading = true;
        state.api.updateBackRequest.error = null;
      })
      .addCase(updateBackRequestThunk.fulfilled, (state, action) => {
        state.api.updateBackRequest.isLoading = false;
        state.api.updateBackRequest.data = action.payload;
        state.api.updateBackRequest.lastFetched = new Date().toISOString();
      })
      .addCase(updateBackRequestThunk.rejected, (state, action) => {
        state.api.updateBackRequest.isLoading = false;
        state.api.updateBackRequest.error = action.payload;
        state.api.updateBackRequest.data = null;
      })
      // getSubsystemRequirements
      .addCase(getSubsystemRequirementsThunk.pending, (state) => {
        state.api.subsystemRequirements.isLoading = true;
        state.api.subsystemRequirements.error = null;
      })
      .addCase(getSubsystemRequirementsThunk.fulfilled, (state, action) => {
        state.api.subsystemRequirements.isLoading = false;
        state.api.subsystemRequirements.data = action.payload;
        state.api.subsystemRequirements.lastFetched = new Date().toISOString();
      })
      .addCase(getSubsystemRequirementsThunk.rejected, (state, action) => {
        state.api.subsystemRequirements.isLoading = false;
        state.api.subsystemRequirements.error = action.payload;
        state.api.subsystemRequirements.data = null;
      })
      // sendImage
      .addCase(sendImageThunk.pending, (state) => {
        state.api.sendImage.isLoading = true;
        state.api.sendImage.error = null;
      })
      .addCase(sendImageThunk.fulfilled, (state, action) => {
        state.api.sendImage.isLoading = false;
        state.api.sendImage.data = action.payload;
        state.api.sendImage.lastFetched = new Date().toISOString();
      })
      .addCase(sendImageThunk.rejected, (state, action) => {
        state.api.sendImage.isLoading = false;
        state.api.sendImage.error = action.payload;
        state.api.sendImage.data = null;
      });
    builder
      .addCase(getInternalChequeDetailThunk.pending, (state) => {
        state.api.getInternalChequeDetail.isLoading = true;
        state.api.getInternalChequeDetail.error = null;
      })
      .addCase(getInternalChequeDetailThunk.fulfilled, (state, action) => {
        state.api.getInternalChequeDetail.isLoading = false;
        state.api.getInternalChequeDetail.data = action.payload;
        state.api.getInternalChequeDetail.lastFetched = new Date().toISOString();
        state.api.getInternalChequeDetail.error = null;
      })
      .addCase(getInternalChequeDetailThunk.rejected, (state, action) => {
        state.api.getInternalChequeDetail.isLoading = false;
        state.api.getInternalChequeDetail.error = action.payload;
        state.api.getInternalChequeDetail.data = null;
      });
    builder
      .addCase(postExternalInquiryThunk.pending, (state) => {
        state.api.postExternalInquiry.isLoading = true;
        state.api.postExternalInquiry.error = null;
      })
      .addCase(postExternalInquiryThunk.fulfilled, (state, action) => {
        state.api.postExternalInquiry.isLoading = false;
        state.api.postExternalInquiry.data = action.payload;
        state.api.postExternalInquiry.lastFetched = new Date().toISOString();
        state.api.postExternalInquiry.error = null;
      })
      .addCase(postExternalInquiryThunk.rejected, (state, action) => {
        state.api.postExternalInquiry.isLoading = false;
        state.api.postExternalInquiry.error = action.payload;
        state.api.postExternalInquiry.data = null;
      });
    builder
      .addCase(putExternalAddThunk.pending, (state) => {
        state.api.putExternalAdd.isLoading = true;
        state.api.putExternalAdd.error = null;
      })
      .addCase(putExternalAddThunk.fulfilled, (state, action) => {
        state.api.putExternalAdd.isLoading = false;
        state.api.putExternalAdd.data = action.payload;
        state.api.putExternalAdd.lastFetched = new Date().toISOString();
        state.api.putExternalAdd.error = null;
      })
      .addCase(putExternalAddThunk.rejected, (state, action) => {
        state.api.putExternalAdd.isLoading = false;
        state.api.putExternalAdd.error = action.payload;
        state.api.putExternalAdd.data = null;
      });
    builder
      .addCase(putIssueThunk.pending, (state) => {
        state.api.putIssue.isLoading = true;
        state.api.putIssue.error = null;
      })
      .addCase(putIssueThunk.fulfilled, (state, action) => {
        state.api.putIssue.isLoading = false;
        state.api.putIssue.data = action.payload;
        state.api.putIssue.lastFetched = new Date().toISOString();
        state.api.putIssue.error = null;
      })
      .addCase(putIssueThunk.rejected, (state, action) => {
        state.api.putIssue.isLoading = false;
        state.api.putIssue.error = action.payload;
        state.api.putIssue.data = null;
      });
    builder
      .addCase(getDeliveryInfoThunk.pending, (state) => {
        state.api.getDeliveryInfo.isLoading = true;
        state.api.getDeliveryInfo.error = null;
      })
      .addCase(getDeliveryInfoThunk.fulfilled, (state, action) => {
        state.api.getDeliveryInfo.isLoading = false;
        state.api.getDeliveryInfo.data = action.payload;
        state.api.getDeliveryInfo.lastFetched = new Date().toISOString();
        state.api.getDeliveryInfo.error = null;
      })
      .addCase(getDeliveryInfoThunk.rejected, (state, action) => {
        state.api.getDeliveryInfo.isLoading = false;
        state.api.getDeliveryInfo.error = action.payload;
        state.api.getDeliveryInfo.data = null;
      });
    builder
      .addCase(getExternalChequeDetailThunk.pending, (state) => {
        state.api.getExternalChequeDetail.isLoading = true;
        state.api.getExternalChequeDetail.error = null;
      })
      .addCase(getExternalChequeDetailThunk.fulfilled, (state, action) => {
        state.api.getExternalChequeDetail.isLoading = false;
        state.api.getExternalChequeDetail.data = action.payload;
        state.api.getExternalChequeDetail.lastFetched = new Date().toISOString();
        state.api.getExternalChequeDetail.error = null;
      })
      .addCase(getExternalChequeDetailThunk.rejected, (state, action) => {
        state.api.getExternalChequeDetail.isLoading = false;
        state.api.getExternalChequeDetail.error = action.payload;
        state.api.getExternalChequeDetail.data = null;
      });
    builder
      .addCase(externalIssueThunk.pending, (state) => {
        state.api.externalIssue.isLoading = true;
        state.api.externalIssue.error = null;
      })
      .addCase(externalIssueThunk.fulfilled, (state, action) => {
        state.api.externalIssue.isLoading = false;
        state.api.externalIssue.data = action.payload;
        state.api.externalIssue.lastFetched = new Date().toISOString();
        state.api.externalIssue.error = null;
      })
      .addCase(externalIssueThunk.rejected, (state, action) => {
        state.api.externalIssue.isLoading = false;
        state.api.externalIssue.error = action.payload;
        state.api.externalIssue.data = null;
      });
  },
});

// Export Actions
export const {
  setStep,
  setScreen,
  nextStep,
  previousStep,
  nextScreen,
  previousScreen,
  setChequeScreen,
  clearInitChequeData,
  clearStepInquiryData,
  clearAccountsListData,
  clearAddAccountData,
  clearChequebooksListData,
  clearAddChequebookData,
  clearChequeSheetsListData,
  clearInternalAddChequeData,
  clearChequeStatusData,
  clearUploadImagesInfo,
  clearInternalChequeDetailData,
  clearExternalChequeDetailData,
  clearDeliveryInfoData,
  clearIssueData,
  clearExternalIssue,
  clearAllApiStates,
  clearAll,
  clearExternalInquiryData,
  clearExternalAddData,
  clearSendImageData,
  clearBackData,
} = chequeSlice.actions;

// Export Reducer
export default chequeSlice.reducer; 