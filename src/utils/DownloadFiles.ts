import { axiosMethod } from '@/api';

interface DownloadFilesParams {
  path: string;
  fileName?: string;
  type?: 'file' | 'excel';
}

export const exportFiles = async ({
  path,
  fileName,
  type = 'file',
}: DownloadFilesParams): Promise<void> => {
  const mimeType =
    type === 'file'
      ? 'application/octet-stream'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  const defaultFileName = type === 'file' ? 'licence.txt' : 'info.xlsx';

  try {
    const responseType: 'arraybuffer' | undefined = type === 'excel' ? 'arraybuffer' : undefined;
    const response = await axiosMethod({
      method: 'GET',
      url: path,
      params: {},
      data: {},
      headers: {},
      responseType,
    });
    const blob = new Blob([response.data], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName || defaultFileName);
    document.body.appendChild(link);
    link.click();

    // Clean up URL object to avoid memory leaks
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
