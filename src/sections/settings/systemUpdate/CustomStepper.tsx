import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface StepData {
  step: string;
  status: 'completed' | 'pending' | 'failed';
  message: string;
}

interface CustomStepperProps {
  stepperData: StepData[];
}

// Custom styles for Stepper lines
const CustomStepperLine = styled(Stepper)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.grey[700], // Color of the lines between steps
  },
}));

const CustomStepper: React.FC<CustomStepperProps> = ({ stepperData }) => {
  const failedStep = stepperData?.findIndex((item) => item.status === 'failed');
  const pendingStep = stepperData?.findIndex((item) => item.status === 'pending');
  const activeStep =
    failedStep !== -1 ? failedStep : pendingStep !== -1 ? pendingStep : stepperData.length;

  const isStepFailed = (step: number) => {
    const failStatus = stepperData?.findIndex(
      (item) => item.status === 'failed' || item.status === 'pending'
    );
    return failStatus !== -1 && step >= failStatus;
  };

  return (
    <Box sx={{ width: '65%' }}>
      <CustomStepperLine activeStep={activeStep} alternativeLabel>
        {stepperData?.map((label, index) => {
          const labelProps: { optional?: React.ReactNode; error?: boolean } = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Step Failed
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={label.step}>
              <StepLabel {...labelProps}>{label.step}</StepLabel>
            </Step>
          );
        })}
      </CustomStepperLine>
    </Box>
  );
};

export default CustomStepper;
