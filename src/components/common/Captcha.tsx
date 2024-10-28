import { Box, IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface CaptchaProps {
  onCaptchaChange: (captcha: string) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onCaptchaChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f2f2f2';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(text, 135, 32);

        ctx.beginPath();
        for (let i = 0; i < 15; i++) {
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        }
        ctx.strokeStyle = '#888';
        ctx.stroke();
      }
    }
  };

  const generateCaptcha = () => {
    const chars = '0123456789';
    // const chars = '0123456789abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      captcha += chars[randomIndex];
    }
    onCaptchaChange(captcha);
    renderCaptcha(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, [onCaptchaChange]);

  const handleClickReload = () => {
    generateCaptcha();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <canvas ref={canvasRef} width={160} height={45} />
      <IconButton sx={{ ml: '4px', width: '40px', height: '40px' }} onClick={handleClickReload}>
        <FiRefreshCw style={{ fontSize: '20px' }} />
      </IconButton>
    </Box>
  );
};

export default Captcha;
