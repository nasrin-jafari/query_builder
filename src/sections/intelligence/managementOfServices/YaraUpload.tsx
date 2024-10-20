import { useState } from 'react';
import Uploader from './UploaderFiles';
import axiosMethod from '@/api';
const ParentComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadHandler = async (files: any) => {
    setLoading(true);

    const formData = new FormData();
    [...files].forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axiosMethod({
        method: 'POST',
        url: `/background_engine/yara/detection/`,
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
    <Uploader
      uploadHandler={uploadHandler}
      setData={setData}
      data={data}
      setShowOutput={setShowOutput}
      showOutput={showOutput}
      loading={loading}
      renderJsonText
    />
  );
};

export default ParentComponent;
