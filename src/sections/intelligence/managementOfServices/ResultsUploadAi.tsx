import React, { useState } from 'react';
import { aiUpload } from '@/constants/tableHeaders';
import { CustomDataGrid } from '@/components';
import { FaEye } from 'react-icons/fa';
import ConfirmationDialog from '../../../components/common/ConfirmationDialog';
import FileDetailsCard from './FileDetailsCard';
import FileProgress from './FileProgress';
import { FileDetails, ResultsUploadAiProps } from './types';
import CustomTooltip from '@/components/common/CustomToolTip';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ResultsUploadAi: React.FC<ResultsUploadAiProps> = ({ results }) => {
  const [open, setOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<FileDetails | null>(null);
  const theme = useTheme();
  const extractedData = results?.map((item) => {
    const result = item['Analysed file'].data?.extra_information?.result;
    const status =
      result === 'BENIGN' ? (
        'سالم'
      ) : result === 'MALWARE' ? (
        'حاوی بدافزار'
      ) : result === 'file_is_invalid' ? (
        'شناخته نشده'
      ) : (
        <CustomTooltip title={'فرمت'}>
          <Chip
            label={result}
            variant="filled"
            color="primary"
            sx={{ color: theme.palette.common.white, cursor: 'pointer' }}
          />
        </CustomTooltip>
      );

    return {
      file_name: item['Analysed file'].data.file_name,
      MD5_hash: item['Analysed file'].data.MD5_hash,
      SHA256_hash: item['Analysed file'].data?.SHA256_hash,
      scan_time: item['Analysed file'].data?.scan_time,
      model_name: item['Analysed file'].model_name,
      name_of_model: item['Analysed file'].data?.extra_information?.name_of_model,
      status,
      details: item['Analysed file'].data?.extra_information?.details,
    };
  });

  const handleOpen = (details: FileDetails) => {
    setSelectedDetails(details);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDetails(null);
  };

  const isFileTypeDetection = extractedData[0]?.name_of_model === 'file-type-detection';
  const contentModal = isFileTypeDetection ? (
    <FileDetailsCard details={selectedDetails} />
  ) : (
    <FileProgress details={selectedDetails} />
  );

  return (
    <>
      <CustomDataGrid
        loading={false}
        pageTotal={1}
        columns={aiUpload}
        rows={extractedData ?? []}
        notExtra
        buttons={[
          {
            label: 'جزییات بیشتر',
            type: 'allowAccess',
            icon: <FaEye />,
            onClick: (_: any, row: any) => {
              handleOpen(row.details as FileDetails);
            },
          },
        ]}
      />
      <ConfirmationDialog onClose={handleClose} open={open} content={contentModal} />
    </>
  );
};

export default ResultsUploadAi;
