import axiosMethod from '@/api';
import UseApi from '@/hooks/UseApi';
import { useLicenseExpiration } from '@/hooks/UseLicenseExpiration';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import FileUploader from './FileUploadCard';
import HwidCard from './HwidCard';
import LicenseDetailsCard from './licenseDetailsCard';
export interface LicenseData {
  company: string;
  expiration_date: string;
  days_to_expire: number;
  status: boolean;
}

const Licence: React.FC = () => {
  const theme = useTheme();
  const { data, loading, handleApiRequest } = UseApi<LicenseData[]>('/licence/info/');
  const { convertDate, formatDate } = useLicenseExpiration();
  const [hwid, setHwid] = useState<string>('');

  const handleUpload = async (data: { file: FileList }) => {
    if (data.file && data.file.length > 0) {
      const formData = new FormData();
      formData.append('file', data.file[0]);

      const res = await handleApiRequest(
        `/licence/validate/`,
        'post',
        formData,
        {},
        { 'Content-Type': 'multipart/form-data' }
      );

      if (res) {
        await handleApiRequest('/licence/info/', 'get');
      }
    }
  };

  const fetchHwid = async () => {
    try {
      const response = await axiosMethod.get<{ data: { hwid: string } }>('/licence/hwid/');
      setHwid(response.data.data.hwid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      convertDate(Number(data[0]?.expiration_date));
    }
  }, [data]);

  const licenseDetails =
    data && data.length > 0
      ? [
          { label: 'نام شرکت', value: data[0]?.company },
          { label: 'وضعیت لایسنس سامانه', value: `${data[0]?.days_to_expire} روز مانده` },
          { label: 'مدت زمان اعتبار لایسنس', value: formatDate || '' },
          {
            label: 'وضعیت',
            value: data[0]?.status ? 'فعال ' : 'غیر فعال',
            color: data[0]?.status ? theme.palette.success.main : theme.palette.error.main,
          },
        ]
      : [];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FileUploader onUpload={handleUpload} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LicenseDetailsCard
            isLoading={loading}
            showLicense={data}
            licenseDetails={licenseDetails}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <HwidCard fetchHwid={fetchHwid} hwid={hwid} />
      </Grid>
    </Box>
  );
};

export default Licence;
