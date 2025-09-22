'use client';

import React from 'react';
import { Typography, Button } from '@/shared/components';
import styles from './ChequeUploadScreenGuidance.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ExpectedCheque from "@/shared/components/Cheque/ExpectedCheque";

interface ChequeUploadScreenGuidanceProps {
  onContinue: () => void;
}

const ChequeUploadScreenGuidance: React.FC<ChequeUploadScreenGuidanceProps> = ({ onContinue }) => {

  const { subsystemRequirements } = useSelector((state: RootState) => state.cheque.api);

  return (
    <div className={styles.container}>
      {/* Content area */}
      <div className={styles.content}>
        {/* Header instruction */}
        <Typography variant="bodyMedium" className={styles.headerInstruction}>
          فیزیک چک را مطابق با راهنمای زیر پر کنید.
        </Typography>

        {/* Cheque Image with highlights */}
        <ExpectedCheque data={subsystemRequirements?.data?.data} backgroundTextColor='#F1C026' />

        {/* Detailed Instructions */}
        <div className={styles.instructionsContainer}>
            {subsystemRequirements.data?.data.info.map((item: string , index: number) => (
                    <Typography key={index} variant="bodyMedium" className={styles.placeholderText}>
                      • {item}
                    </Typography>
            ))}
        </div>
      
      </div>
        {/* Continue Button */}
        <div className={styles.buttonContainer}>
          <Button 
            variant="filled" 
            fullWidth
            onClick={onContinue}
          >
            ادامه
          </Button>
        </div>
    </div>
  );
};

export default ChequeUploadScreenGuidance;