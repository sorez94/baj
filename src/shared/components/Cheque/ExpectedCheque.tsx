import React from "react";
import styles from "./ExpectedCheque.module.scss";
import Image from "next/image";
import Typography from "../Typography/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

interface ExpectedChequeProps {
  data: any;
  backgroundTextColor: string;
}

interface ChequeFieldProps {
  top: string;
  width: string;
  value?: string | number;
  fontSize: string;
  backgroundColor?: string
}

const ChequeField: React.FC<ChequeFieldProps> = ({ top, width, value, fontSize, backgroundColor }) => {
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
      <div style={{ width, color: "white", padding: "10px", float: "left" }}>
        <Typography className={styles.textImage} sx={{ fontSize,backgroundColor, lineHeight: 2 }}>
          {value}
        </Typography>
      </div>
    </div>
  );
};

const ExpectedCheque: React.FC<ExpectedChequeProps> = ({ data, backgroundTextColor }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  console.log(data)
  const fontSizeImage = isMobile ? "8px" : isTablet ? "14px" : "14px";

  const mobileFields: ChequeFieldProps[] = [
    { top: "5%", width: "88%", value: data?.due_date, fontSize: fontSizeImage },
    { top: "12%", width: "82%", value: data?.due_date_string, fontSize: fontSizeImage },
    { top: "23%", width: "78%", value: data?.amount_string, fontSize: fontSizeImage },
    { top: "35%", width: "92%", value: data?.beneficiary_name, fontSize: fontSizeImage },
    { top: "35%", width: "44%", value: data?.beneficiary_id, fontSize: fontSizeImage },
    { top: "53%", width: "45%", value: data?.amount, fontSize: fontSizeImage },
  ];

  const desktopFields: ChequeFieldProps[] = [
    { top: "9%", width: "86%", value: data?.due_date, fontSize: fontSizeImage },
    { top: "18%", width: "82%", value: data?.due_date_string, fontSize: fontSizeImage },
    { top: "30%", width: "75%", value: data?.amount_string, fontSize: fontSizeImage },
    { top: "42%", width: "92%", value: data?.beneficiary_name, fontSize: fontSizeImage },
    { top: "42%", width: "40%", value: data?.beneficiary_id, fontSize: fontSizeImage },
    { top: "60%", width: "43%", value: data?.amount, fontSize: fontSizeImage },
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
        <ChequeField backgroundColor={backgroundTextColor} key={idx} {...field} />
      ))}
    </div>
  );
};

export default ExpectedCheque;
