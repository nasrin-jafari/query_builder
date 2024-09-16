import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IoCloseSharp } from 'react-icons/io5';
import { useTheme } from '@mui/material/styles';

// interface RowData {
//   [key: string]: any;
// }

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onClose: () => void;
  type?: string | null;
  maxWidth?: 'lg' | 'md';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  content,
  onConfirm,
onClose,
type,
maxWidth,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      style={{ direction: 'rtl', backgroundColor: 'rgba(6, 70, 93, 0.2)' }}
      maxWidth={maxWidth ? maxWidth : 'sm'}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '20px',
          background: theme.palette.grey[300],
          textAlign: 'justify',
          boxShadow: 4,
          width: '100%',
        },
      }}
    >
      <DialogActions>
        <Button onClick={onClose} sx={{ padding: '5px', fontSize: '24px' }}>
          <IoCloseSharp style={{ color: theme.palette.primary.main }} />
        </Button>
      </DialogActions>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>{title}</DialogTitle>
      <DialogContent sx={{ padding: '10px' }}>{content}</DialogContent>
      {type === 'delete' && (
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="error" sx={{ marginRight: '8px' }}>
            خیر
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="success"
            sx={{ marginRight: '8px' }}
          >
            بلی
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmationDialog;
