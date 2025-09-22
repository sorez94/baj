import React from "react";
import Typography from "../../../../shared/components/Typography/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

// Define a utility function to map highlight types to CSS custom properties
const getColorClass = (highlight?: string): string => {
  switch (highlight) {
    case "ERROR":
      return "var(--color-error)";
    case "SUCCESS":
      return "var(--color-success)";
    case "WARNING":
      return "var(--color-warning)";
    default:
      return "var(--color-text-primary)"; // Default to primary text color
  }
};

const ChequeScreenStatusHighlightedInfo: React.FC<{ info?: string; highlight?: string }> = ({ info, highlight }) => {
  if (!info) return null;
  const theme = useTheme();

  // Detect device screen size
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const parts = info.split("#");

  const colorClass = getColorClass(highlight);

  // Set font size based on the device
  const fontSize = isMobile
    ? '14px'
    : isTablet
      ? '18px'
      : '18px';

  return (
    <Typography
      variant="bodyMedium"
      color="textSecondary"
      className="leading-7"
      style={{ fontSize }}
    >
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <span key={idx} style={{ color: colorClass, fontWeight: 'bold' }}>
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </Typography>
  );
};

export default ChequeScreenStatusHighlightedInfo;
