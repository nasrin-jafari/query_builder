import React, { useEffect, useState } from 'react';
import { axiosMethod } from '@/api';
import { Box, Card, Divider, Typography } from '@mui/material';
import { FaHeadSideVirus, FaShieldVirus, FaVirus, FaViruses } from 'react-icons/fa';
import { FaSquareVirus, FaVirusCovidSlash } from 'react-icons/fa6';
import { TbVirusSearch } from 'react-icons/tb';
import { PiVirusFill } from 'react-icons/pi';
import { useTheme } from '@mui/material/styles';
import useApi from '@/hooks/UseApi';
import Uploader from './UploaderFiles';

interface Model {
  name: string;
  endpoint: string;
}
const iconList = [
  <FaShieldVirus key="FaShieldVirus" />,
  <FaHeadSideVirus key="FaHeadSideVirus" />,
  <FaVirus key="FaVirus" />,
  <FaVirusCovidSlash key="FaVirusCovidSlash" />,
  <FaViruses key="FaViruses" />,
  <TbVirusSearch key="TbVirusSearch" />,
  <PiVirusFill key="PiVirusFill" />,
  <FaSquareVirus key="FaSquareVirus" />,
];

const AiUpload = () => {
  const [showOutput, setShowOutput] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const theme = useTheme();
  const { data: listModels } = useApi<Model[]>('/ai/models-list/');
  useEffect(() => {
    if (listModels) {
      setSelectedModel(listModels[0]?.endpoint);
    }
  }, [listModels]);

  const uploadFiles = async (files: any) => {
    setLoading(true);

    const formData = new FormData();
    [...files].forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axiosMethod({
        method: 'POST',
        url: `/ai/upload/${selectedModel}/`,
        params: {},
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response?.data?.data);
      setShowOutput(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography sx={{ width: '100%', mb: 2 }}>لیست مدل ها</Typography>
        {listModels?.map((model, index) => (
          <Card
            key={model?.name}
            onClick={() => setSelectedModel(model.endpoint)}
            sx={{
              background:
                selectedModel === model.endpoint
                  ? theme.palette.primary.light
                  : theme.palette.grey[300],
              boxShadow: 5,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '10px',
              p: '12px',
              mb: '16px',
              border:
                selectedModel === model.endpoint
                  ? `1px solid ${theme.palette.primary.main}`
                  : `1px solid ${theme.palette.grey[500]}`,
              width: '190px',
              justifyContent: 'space-between',
              cursor: 'pointer',
              textAlign: 'end',
            }}
          >
            <Box style={{ fontSize: '20px' }}>{iconList[index % iconList.length]}</Box>
            <Typography sx={{ fontSize: '14px' }}>{model?.name}</Typography>
          </Card>
        ))}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <Uploader
        model={selectedModel}
        setData={setData}
        data={data}
        uploadHandler={uploadFiles}
        showOutput={showOutput}
        setShowOutput={setShowOutput}
        loading={loading}
      />
    </Box>
  );
};

export default AiUpload;
