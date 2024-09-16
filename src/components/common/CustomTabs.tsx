import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  innerBoxHorizontal: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  innerBoxVertical: {
    flexGrow: 1,
    bgcolor: theme.palette.grey[600],
    height: 'auto',
    position: 'fixed',
    right: 0,
    top: '50%',
    transform: 'translate(0,-50%)',
    zIndex: 999, // Lower than ProfileMenu
    borderRadius: '15px 0px 0px 15px',
    '& .MuiButtonBase-root': {
      transform: 'rotate(90deg)',
      margin: '25px -15px',
      padding: 0,
    },
  },
  paperHorizontal: {
    maxWidth: { xs: 320, sm: 650 },
    bgcolor: theme.palette.grey[500],
    borderRadius: '8px',
  },
  paperVertical: {
    background: 'transparent',
    borderRadius: '15px 0px 0px 15px',
  },
});

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  orientation?: 'horizontal' | 'vertical';
  tabs: TabData[];
  showLoader?: boolean;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  orientation = 'horizontal',
  tabs,
  showLoader,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const styles = useStyles(theme);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={orientation === 'vertical' ? styles.innerBoxVertical : styles.innerBoxHorizontal}>
        <Paper sx={orientation === 'vertical' ? styles.paperVertical : styles.paperHorizontal}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label={
              orientation === 'vertical' ? 'basic tabs example' : 'scrollable auto tabs example'
            }
            orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Paper>
      </Box>
      {!showLoader &&
        tabs?.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))}
    </Box>
  );
};

export default CustomTabs;
