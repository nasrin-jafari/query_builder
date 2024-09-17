import { useThemeContext } from '@/lib/theme/ThemeContext';
import { Box, Divider, IconButton } from '@mui/material';
import { BsMoon, BsSun } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
const ThemeToggleButton = () => {
  const { toggleTheme, isLightMode } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="  ctrl + q تغییر پس زمینه">
        <IconButton aria-label={isLightMode ? 'ligh-theme' : 'dark-theme'} onClick={toggleTheme}>
          {isLightMode ? <BsMoon size={24} /> : <BsSun />}
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />
    </Box>
  );
};
export default ThemeToggleButton;
