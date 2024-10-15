import { useThemeContext } from '@/lib/theme/ThemeContext';
import { Box, Divider, IconButton } from '@mui/material';
import { BsMoon, BsSun } from 'react-icons/bs';
import CustomTooltip from '@/components/common/CustomToolTip';
import { useTheme } from '@mui/material/styles';
const ThemeToggleButton = () => {
  const { toggleTheme, isLightMode } = useThemeContext();
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Divider orientation="vertical" flexItem />
      <CustomTooltip title="  ctrl + q تغییر پس زمینه">
        <IconButton aria-label={isLightMode ? 'ligh-theme' : 'dark-theme'} onClick={toggleTheme}>
          {isLightMode ? (
            <BsMoon size={24} style={{ color: theme.palette.grey[200] }} />
          ) : (
            <BsSun style={{ color: theme.palette.grey[200] }} />
          )}
        </IconButton>
      </CustomTooltip>

      <Divider orientation="vertical" flexItem />
    </Box>
  );
};
export default ThemeToggleButton;
