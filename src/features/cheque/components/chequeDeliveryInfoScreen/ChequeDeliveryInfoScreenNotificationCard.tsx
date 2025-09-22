import React from 'react';
import {DynamicIcons, Typography} from "@/shared/components";

import {Box, Tooltip} from '@mui/material';

const ChequeDeliveryInfoScreenNotificationCard = ({info}: { info: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-input-secondary)',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: 1,
        marginTop: '24px',
      }}
    >
      <Tooltip title="اطلاعات بیشتر">
        <Box sx={{margin: '0 8px 0 0px'}}>
          <DynamicIcons
            type="info"
            width={20}
            height={20}
            color='var(--color-text-primary)'
          />
        </Box>
      </Tooltip>
      <Typography variant="bodyMedium" sx={{flex: 1, color: 'var(--color-text-primary)'}}>
        {info}
      </Typography>
    </Box>
  );
};

export default ChequeDeliveryInfoScreenNotificationCard;
