import { toast } from 'react-toastify';

export const CopyText = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  // Hide the textarea
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    if (!document.hidden) {
      setTimeout(() => {
        toast.success('متن مورد نظر کپی شد! ', {
          pauseOnFocusLoss: false,
        });
      }, 100);
    }
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
};
