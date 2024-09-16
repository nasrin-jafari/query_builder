import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

interface CustomTooltipProps {
  children: ReactElement;
  title: ReactElement | string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, title }) => {
  const CustomizeTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, -10] },
          },
        ],
      }}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[900],
      boxShadow: theme.shadows[1],
      fontSize: 13,
      padding: 12,
    },
  }));

  return <CustomizeTooltip title={title}>{children}</CustomizeTooltip>;
};

export default CustomTooltip;
