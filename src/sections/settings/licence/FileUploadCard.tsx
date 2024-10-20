import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IFormInputs {
  file: FileList;
}

interface FileUploaderProps {
  onUpload: (data: IFormInputs) => void;
  multipleUpload?: boolean;
}

const validationSchema = yup.object().shape({
  file: yup
    .mixed<FileList>()
    .required('لطفا یک فایل را انتخاب کنید')
    .test('fileSize', 'فایل انتخابی معتبر نیست. حداکثر سایز مجاز 2MB است.', (value) => {
      if (!value || value.length === 0) {
        return true;
      }
      return Array.from(value).every((file) => file.size <= 2000000);
    }),
});

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, multipleUpload }) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      file: new DataTransfer().files,
    },
  });

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setValue('file', e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setValue('file', e.target.files);
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    onUpload(data);
    reset();
  };

  return (
    <Card
      sx={{
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
        border: dragActive
          ? `2px dashed ${theme.palette.primary.main}`
          : errors.file
            ? `2px dashed red`
            : `2px dashed ${theme.palette.grey[700]}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '300px',
        background: theme.palette.grey[100],
        mt: 2,
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="file"
                style={{ display: 'none' }}
                id="fileUpload"
                onChange={(e) => {
                  field.onChange(e.target.files);
                  handleChange(e);
                }}
                multiple={multipleUpload}
              />
              <label
                htmlFor="fileUpload"
                style={{ cursor: 'pointer', display: 'block', padding: '20px' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ color: 'white' }}
                >
                  انتخاب فایل
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  max : 2MB فایل
                </Typography>
              </label>
              {field?.value && (
                <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }}>
                  {multipleUpload
                    ? Array.from(field.value)
                        .map((file) => file.name)
                        .join(', ')
                    : field?.value[0]?.name}
                </Typography>
              )}
            </>
          )}
        />
        {errors.file && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errors?.file?.message}
          </Typography>
        )}
      </Box>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: '100%' }}
        style={{ color: 'white' }}
      >
        آپلود فایل
      </Button>
    </Card>
  );
};

export default FileUploader;
