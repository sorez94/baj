import React from 'react';
import {DynamicIcons, Typography} from "@/shared/components";

enum CompareTypeEnum {
  MATCHED = "MATCHED",
  EXCEEDED = "EXCEEDED",
  MISMATCHED = "MISMATCHED",
}

interface ChequeStatusScreenButtonsProps {
  status?: CompareTypeEnum;
}

const ChequeScreenWarning: React.FC<ChequeStatusScreenButtonsProps> = ({ status }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
      <div>
        <DynamicIcons color='var(--color-input-secondary-dark)' type={'warning'} width={24} height={24}/>
      </div>
      <Typography variant='bodySmall'>
        توجه داشته باشید که فیزیک چک باید منطبق با مقادیر
        {' '}
        <span style={{ fontSize: '12px', fontWeight: '700' }}>
    چک ثبت‌شده شما
  </span>
        {' '}
        پر شود.
      </Typography>
    </div>
  );
};

export default ChequeScreenWarning;
