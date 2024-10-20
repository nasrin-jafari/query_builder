import { Box, Button, Card, CircularProgress, Paper, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CiFileOn } from 'react-icons/ci';
import { IoIosCloudUpload, IoMdArrowBack, IoMdTrash } from 'react-icons/io';
import { IoAnalytics } from 'react-icons/io5';
import CustomTooltip from '@/components/common/CustomToolTip';
import ResultsUploadAi from './ResultsUploadAi';

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
interface UploaderProps {
  model?: string | null;
  uploadHandler: (files: File[]) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
  setShowOutput: React.Dispatch<React.SetStateAction<boolean>>;
  showOutput: boolean;
  loading: boolean;
  singleFile?: boolean;
  renderJsonText?: boolean;
}

const Uploader: React.FC<UploaderProps> = ({
  model,
  uploadHandler,
  setData,
  data,
  setShowOutput,
  showOutput,
  loading,
  singleFile = false,
  renderJsonText = false,
}) => {
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [highlight, setHighlight] = useState(false);
  useEffect(() => {
    setSelectedFiles([]);
    setData([]);
    setShowOutput(false);
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 500);
    return () => clearTimeout(timer);
  }, [model]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (singleFile) {
      setSelectedFiles(event.target.files ? [event.target.files[0]] : []);
    } else {
      setSelectedFiles(event.target.files ? Array.from(event.target.files) : []);
    }
  };

  const handleForm = () => {
    if (uploadHandler) {
      uploadHandler(selectedFiles);
    }
  };

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
    if (singleFile) {
      setSelectedFiles([files[0]]);
    } else {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
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
  const renderJsonPreText = (obj: OutputType[]) => {
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
            fontWeight: 'bold',
          }}
          dangerouslySetInnerHTML={{ __html: formattedJson }}
        />
      </Box>
    );
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, direction: 'ltr' }}>
      <Paper
        sx={{
          borderRadius: '16px',
          padding: '16px',
          width: '100%',
          my: 2,
          background: theme.palette.grey[50],
          animation: highlight ? 'highlight 0.6s ease-in-out' : 'none',
          '@keyframes highlight': {
            '0%': { transform: 'scale(1)', boxShadow: 'none' },
            '50%': { transform: 'scale(1.02)' },
            '100%': { transform: 'scale(1)', boxShadow: 'none' },
          },
        }}
      >
        {!showOutput || !data ? (
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
                    multiple={!singleFile}
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
                            key={index}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '8px',
                              paddingBottom: '4px',
                              borderBottom:
                                selectedFiles.length - 1 !== index ? '1px solid gray' : '',
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
                  size="small"
                  variant="contained"
                  onClick={handleForm}
                  disabled={loading || selectedFiles.length === 0}
                  startIcon={<IoAnalytics />}
                >
                  {loading ? (
                    <CircularProgress style={{ color: theme.palette.grey[100] }} size={24} />
                  ) : (
                    'بررسی فایل ها'
                  )}
                </Button>
                {selectedFiles.length > 0 && (
                  <Button
                    variant="contained"
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
                border: `1px solid ${theme.palette.grey[900]}`,
                borderRadius: '12px',
                width: '190px',
                p: 1,
                cursor: 'pointer',
              }}
            >
              <Typography>بازگشت به آپلود فایل</Typography>
              <IoMdArrowBack />
            </Box>

            {renderJsonText ? (
              <Card sx={{ mt: 2, width: '100%', background: 'transparent' }}>
                {renderJsonPreText(data)}
              </Card>
            ) : (
              <ResultsUploadAi results={data} />
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Uploader;
