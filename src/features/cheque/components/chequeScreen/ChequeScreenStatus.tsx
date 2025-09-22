import React from 'react';
import Typography from "../../../../shared/components/Typography/Typography";
import ChequeScreenStatusHighlightedInfo
  from "@/features/cheque/components/chequeScreen/ChequeScreenStatusHighlightedInfo";
import styles from './ChequeScreenStatus.module.scss';
import {useMediaQuery, useTheme} from "@mui/material";
import ChequeScreenStatusButtons from "@/features/cheque/components/chequeScreen/ChequeScreenStatusButtons";
import ExpectedCheque from "@/shared/components/Cheque/ExpectedCheque";
import RegisteredCheque from "@/shared/components/Cheque/RegisteredCheque";
import ChequeScreenWarning from "@/features/cheque/components/chequeScreen/ChequeScreenWarning";

export enum CompareTypeEnum { MATCHED = "MATCHED", EXCEEDED = "EXCEEDED", MISMATCHED = "MISMATCHED"}

const ChequeScreenStatus = ({chequeStatusData}: { chequeStatusData: any }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const fontSize = isMobile
    ? '14px'
    : isTablet
      ? '18px'
      : '18px';

  const compareType = chequeStatusData?.compare_type;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.infoStatus}>
          <ChequeScreenStatusHighlightedInfo
            info={chequeStatusData?.info}
            highlight={chequeStatusData?.info_high_light}
          />
        </div>
        <div>
          <div className={styles.expectedCheque}>
            <Typography fontSize={fontSize} variant="bodyMedium" color="--color-text-primary">
              چک مورد انتظار باجت:
            </Typography>
          </div>
          <ExpectedCheque data={chequeStatusData?.facility_cheque} backgroundTextColor='var(--color-primary-dark)'/>
          <div className={styles.registeredCheque}>
            <Typography fontSize={fontSize} variant="bodyMedium" color="textSecondary" className="mt-4">
              چک ثبت شده شما:
            </Typography>
          </div>
          <RegisteredCheque data={chequeStatusData?.user_cheque}/>
        </div>
        {(compareType === CompareTypeEnum.MATCHED || compareType === CompareTypeEnum.EXCEEDED) && (
          <ChequeScreenWarning status={compareType}/>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <ChequeScreenStatusButtons status={compareType}/>
      </div>
    </div>
  );
};

export default ChequeScreenStatus;

