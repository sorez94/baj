import React from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import Typography from "../../../shared/components/Typography/Typography";
import styles from "./RegisteredCheque.module.scss";
import Image from "next/image";

type Status = "ERROR" | "SUCCESS" | "WARNING";

interface RegisteredChequeProps {
  data: any;
}

const getBackgroundColor = (status?: Status) => {
  switch (status) {
    case "ERROR":
      return "var(--color-error-dark)";
    case "SUCCESS":
      return "var(--color-success-dark)";
    case "WARNING":
      return "var(--color-warning-dark)";
    default:
      return "transparent";
  }
};

interface ChequeFieldProps {
  top: string;
  width: string;
  value?: string | number;
  status?: Status;
  fontSize: string;
}

const ChequeField: React.FC<ChequeFieldProps> = ({
                                                   top,
                                                   width,
                                                   value,
                                                   status,
                                                   fontSize,
                                                 }) => {
  if (!value) return null;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: "0",
        width: "100%",
        height: "150px",
      }}
    >
      <div style={{width, color: "white", padding: "10px", float: "left"}}>
        <Typography
          className={styles.textImage}
          sx={{fontSize, lineHeight: 2}}
          style={{backgroundColor: getBackgroundColor(status)}}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};

const RegisteredCheque: React.FC<RegisteredChequeProps> = ({data}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const fontSizeImage = isMobile ? "8px" : isTablet ? "14px" : "14px";

  const mobileFields: ChequeFieldProps[] = [
    {
      top: "5%",
      width: "88%",
      value: data?.due_date?.due_date,
      status: data?.due_date?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "12%",
      width: "82%",
      value: data?.due_date_string?.due_date_string,
      status: data?.due_date_string?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "23%",
      width: "78%",
      value: data?.amount_string?.amount_string,
      status: data?.amount_string?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "35%",
      width: "92%",
      value: data?.beneficiary_name?.beneficiary_name,
      status: data?.beneficiary_name?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "35%",
      width: "44%",
      value: data?.beneficiary_id?.beneficiary_id,
      status: data?.beneficiary_id?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "53%",
      width: "45%",
      value: data?.amount?.amount,
      status: data?.amount?.color,
      fontSize: fontSizeImage,
    },
  ];

  const desktopFields: ChequeFieldProps[] = [
    {
      top: "9%",
      width: "86%",
      value: data?.facility_cheque?.due_date,
      status: data?.due_date?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "18%",
      width: "82%",
      value: data?.due_date_string?.due_date_string,
      status: data?.due_date_string?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "30%",
      width: "75%",
      value: data?.amount_string?.amount_string,
      status: data?.amount_string?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "42%",
      width: "92%",
      value: data?.beneficiary_name?.beneficiary_name,
      status: data?.beneficiary_name?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "42%",
      width: "40%",
      value: data?.beneficiary_id?.beneficiary_id,
      status: data?.beneficiary_id?.color,
      fontSize: fontSizeImage,
    },
    {
      top: "60%",
      width: "43%",
      value: data?.amount?.amount,
      status: data?.amount?.color,
      fontSize: fontSizeImage,
    },
  ];

  const fields = isMobile ? mobileFields : desktopFields;

  return (
    <div className={styles.imageContainer}>
      <Image
        className={styles.expectedChequeImage}
        src="/assets/images/cheques/cheque.png"
        alt="باجت - چک"
        width={1200}
        height={200}
      />
      {fields.map((field, idx) => (
        <ChequeField key={idx} {...field} />
      ))}
    </div>
  );
};

export default RegisteredCheque;
