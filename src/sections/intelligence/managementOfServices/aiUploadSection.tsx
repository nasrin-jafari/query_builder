import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useApi from '@/hooks/UseApi';
import { IoIosCloudUpload, IoMdArrowBack, IoMdTrash } from 'react-icons/io';
import { CiFileOn } from 'react-icons/ci';
import CustomTooltip from '@/components/common/CustomToolTip';
import { IoAnalytics } from 'react-icons/io5';
import { FaHeadSideVirus, FaShieldVirus, FaVirus, FaViruses } from 'react-icons/fa';
import { FaSquareVirus, FaVirusCovidSlash } from 'react-icons/fa6';
import { TbVirusSearch } from 'react-icons/tb';
import { PiVirusFill } from 'react-icons/pi';
import axiosMethod from '@/api';

type FileData = {
  success: boolean;
  data: {
    file_name: string;
    MD5_hash: string;
    SHA256_hash: string;
    scan_time: number;
    extra_information: {
      name_of_model: string;
      result: string;
      details: Record<string, any>;
    };
  };
  model_name: string;
};
type OutputType = {
  [key: string]: FileData;
};
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

const AiUploadSection: React.FC = () => {
  const theme = useTheme();
  const [dragging, setDragging] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [outPut, setUtPut] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const { data } = useApi<Model[]>('/ai/models-list/');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setSelectedModel(data[0]?.endpoint);
    }
  }, [data]);
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };
  const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop();
  };

  const truncateFileName = (fileName: string) => {
    if (fileName.length > 16) {
      return `...${fileName.substring(0, 16)}`;
    }
    return fileName;
  };
  const handleForm = async () => {
    const formData = new FormData();
    [...selectedFiles].forEach((file) => {
      formData.append('file', file);
    });
    try {
      setLoading(true);

      const res = await axiosMethod.post(`/ai/upload/${selectedModel}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setUtPut(res?.data?.data);
        setShowOutput(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleClearFiles = () => {
    setSelectedFiles([]);
  };
  useEffect(() => {
    setSelectedFiles([]);
    setUtPut([]);
    setShowOutput(false);
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 500);
    return () => clearTimeout(timer);
  }, [selectedModel]);

  const renderJson = (obj: OutputType[]) => {
    if (!obj) return null;

    const jsonString = JSON.stringify(obj, null, 2);

    const formattedJson = jsonString
      .replace(
        /"([^"]+)":/g,
        `<span style="color: ${theme.palette.grey[700]}">"</span><span style="color: ${
          theme.palette.warning.main
        }">$1</span><span style="color: ${theme.palette.grey[700]}">"</span>:`
      )
      .replace(
        /:\s*"([^"]+)"/g,
        `: <span style="color: ${
          theme.palette.grey[700]
        }">"</span><span style="color: ${theme.palette.info.main}">$1</span><span style="color:${
          theme.palette.grey[700]
        }">"</span>`
      )
      .replace(/:\s*(\d+)/g, `: <span style="color: ${theme.palette.info.main}">$1</span>`)
      .replace(/([{}[\]])/g, `<span style="color: ${theme.palette.primary.main}">$1</span>`);

    return (
      <Box
        sx={{
          width: '100%',
          height: '360px',
          overflow: 'auto',
          background: 'transparent',
          padding: '12px',
        }}
      >
        <pre
          style={{
            direction: 'ltr',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: '1.5',
            fontFamily: 'monospace',
          }}
          dangerouslySetInnerHTML={{ __html: formattedJson }}
        />
      </Box>
    );
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography sx={{ width: '100%', mb: 2 }}>لیست مدل ها</Typography>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((model, index) => (
            <Card
              key={model.name}
              onClick={() => setSelectedModel(model.endpoint)}
              sx={{
                background:
                  selectedModel === model.endpoint
                    ? theme.palette.primary.light
                    : theme.palette.grey[700],
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
              <Typography sx={{ fontSize: '14px' }}>{model.name}</Typography>
            </Card>
          ))}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, direction: 'ltr' }}>
        <Paper
          sx={{
            borderRadius: '16px',
            padding: '16px',
            width: '100%',
            background: 'rgb(9,21,31)',
            border: `1px solid ${theme.palette.grey[500]}`,
            animation: highlight ? 'highlight 0.6s ease-in-out' : 'none',
            '@keyframes highlight': {
              '0%': { transform: 'scale(1)', boxShadow: 'none' },
              '50%': { transform: 'scale(1.02)' },
              '100%': { transform: 'scale(1)', boxShadow: 'none' },
            },
          }}
        >
          {!showOutput || !outPut.length ? (
            <Box sx={{ padding: '12px', height: '420px' }}>
              <>
                <Card
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: `2px dashed ${
                      dragging ? theme.palette.primary.main : theme.palette.grey[200]
                    }`,
                    borderRadius: '10px',
                    height: '350px',
                    background: 'transparent',
                  }}
                >
                  <Box
                    sx={{
                      width: { md: '40%', lg: '55%' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      accept="*/*"
                      style={{ display: 'none' }}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" component="span" startIcon={<IoIosCloudUpload />}>
                        انتخاب فایل‌
                      </Button>
                    </label>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      margin: '2px',
                      justifyContent: selectedFiles.length > 0 ? 'flex-start' : 'center',
                      padding: '8px',
                      width: '45%',
                      ml: 2,
                      borderRadius: '0 16px 16px 0',
                      overflowY: 'auto',
                      height: '298px',
                      maxHeight: '292px',
                      borderLeft: `1px solid ${theme.palette.grey[200]}`,
                    }}
                  >
                    {selectedFiles.length > 0 ? (
                      <>
                        <Typography sx={{ mb: 2 }}>فایل های آپلود شده...</Typography>
                        <Box style={{ width: '100%' }}>
                          {Array.from(selectedFiles).map((file, index) => (
                            <Box
                              component="div"
                              key={index}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px',
                                paddingBottom: '4px',
                                borderBottom:
                                  selectedFiles.length - 1 !== index ? '1px solid gray' : undefined,
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: '8px',
                                  fontSize: '10px',
                                }}
                              >
                                <CiFileOn style={{ fontSize: '38px', marginRight: '4px' }} />
                                <span style={{ marginRight: '-28px' }}>
                                  {getFileExtension(file.name)}.
                                </span>
                              </Box>
                              <CustomTooltip title={file.name}>
                                <Typography>{truncateFileName(file.name)}</Typography>
                              </CustomTooltip>
                            </Box>
                          ))}
                        </Box>
                      </>
                    ) : (
                      <Typography variant="body2">هنوز فایلی آپلود نشده!</Typography>
                    )}
                  </Box>
                </Card>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleForm}
                    disabled={loading || selectedFiles.length === 0}
                    startIcon={<IoAnalytics />}
                  >
                    {loading ? (
                      <CircularProgress style={{ color: theme.palette.grey[300] }} size={24} />
                    ) : (
                      'بررسی فایل ها'
                    )}
                  </Button>
                  {selectedFiles.length > 0 && (
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleClearFiles}
                      startIcon={<IoMdTrash />}
                    >
                      حذف فایل ها
                    </Button>
                  )}
                </Box>
              </>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Box
                onClick={() => setShowOutput(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: `1px solid #4F575E`,
                  borderRadius: '12px',
                  width: '190px',
                  p: 1,
                  cursor: 'pointer',
                }}
              >
                <Typography>بازگشت به آپلود فایل</Typography>
                <IoMdArrowBack />
              </Box>
              <Card sx={{ mt: 2, width: '100%', background: 'transparent' }}>
                {renderJson(outPut)}
              </Card>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default AiUploadSection;
