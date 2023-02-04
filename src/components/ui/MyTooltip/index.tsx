import { SxProps, Tooltip, TooltipProps, Zoom } from '@mui/material';
import { ReactElement } from 'react';

interface ITooltipProps extends TooltipProps {
  title: string;
  children: ReactElement;
  color?: string;
  sx?: SxProps;
}

function MyTooltip({ title, children, color = '#f50057', sx, ...passProps }: ITooltipProps) {
  return (
    <Tooltip
      arrow
      title={title}
      enterDelay={200}
      leaveDelay={200}
      TransitionComponent={Zoom}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: color,
            color: '#ffff',
            '& .MuiTooltip-arrow': {
              color,
            },
            userSelect: 'none',
            ...sx,
          },
        },
      }}
      {...passProps}
    >
      {children}
    </Tooltip>
  );
}

export default MyTooltip;
