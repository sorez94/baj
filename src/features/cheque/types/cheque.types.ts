export interface Cheque {
  id: number;
  chequeNumber: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  issueDate: string;
  dueDate: string;
  status: ChequeStatus;
  statusText: string;
  description?: string;
  payeeName?: string;
  drawerName?: string;
  serialNumber?: string;
  branchCode?: string;
  createdAt: string;
  updatedAt: string;
}

export type ChequeStatus = 'active' | 'expired' | 'cashed' | 'cancelled' | 'pending';

export interface ChequeFormData {
  chequeNumber: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  issueDate: string;
  dueDate: string;
  description?: string;
  payeeName?: string;
  drawerName?: string;
  serialNumber?: string;
  branchCode?: string;
}

export interface ChequeFilters {
  status?: ChequeStatus;
  bankName?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export interface ChequeStats {
  totalCount: number;
  activeCount: number;
  expiredCount: number;
  cashedCount: number;
  cancelledCount: number;
  totalAmount: number;
  activeAmount: number;
}

export interface ChequeAction {
  id: string;
  label: string;
  icon: string;
  action: (cheque: Cheque) => void;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

type StatusColor = "SUCCESS" | "ERROR";

interface FacilityCheque {
  amount: number;
  due_date: string;
  beneficiary_id: string;
  beneficiary_name: string;
  due_date_string: string | null;
  amount_string: string | null;
}

interface UserCheque {
  amount: {
    amount: number;
    color: StatusColor;
  };
  due_date: {
    due_date: string;
    color: StatusColor;
  };
  beneficiary_id: {
    beneficiary_id: string;
    color: StatusColor;
  };
  beneficiary_name: {
    beneficiary_name: string;
    color: StatusColor;
  };
  due_date_string: {
    due_date_string: string;
    color: StatusColor;
  };
  amount_string: {
    amount_string: string;
    color: StatusColor;
  };
}

export interface ChequeConflictData {
  request_id: string;
  is_conflict: boolean;
  current_step: string;
  facility_cheque: FacilityCheque;
  user_cheque: UserCheque;
  info: string;
  warning: string | null;
  info_high_light: StatusColor;
  compare_type: "MISMATCHED" | "MATCHED" | "EXCEEDED";
}

export interface ChequeConflictResponse {
  data: ChequeConflictData;
  message: string | null;
}