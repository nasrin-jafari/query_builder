import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
import { AiOutlineRadarChart } from 'react-icons/ai';
import { BsClipboardData } from 'react-icons/bs';
// import { FaClock, FaHdd, FaMemory, FaTachometerAlt } from 'react-icons/fa';
import { LuNetwork } from 'react-icons/lu';

const PieChartIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24">
    <path fill="#FF6384" d="M12 2A10 10 0 0 0 2 12h10z" />
    <path fill="#36A2EB" d="M14 1v9h10A10 10 0 0 0 10 2z" />
    <path fill="#FFCE56" d="M2 12a10 10 0 0 0 10 10V12z" />
    <path fill="#4BC0C0" d="M12 22a10 10 0 0 0 10-10H12z" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24">
    <rect x="8" y="10" width="2" height="10" fill="#FF6384" />
    <rect x="12" y="7" width="2" height="13" fill="#36A2EB" />
    <rect x="16" y="4" width="2" height="16" fill="#FFCE56" />
    <rect x="20" y="1" width="2" height="19" fill="#4BC0C0" />
    <path d="M4 22h22v2H4z" fill="#9BB5BE" />
    <path d="M4 2v20h2V2z" fill="#9BB5BE" />
  </svg>
);

const CustomBarChartHorizontalIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
    <rect x="2" y="4" width="16" height="3" fill="#FF6384" />
    <rect x="2" y="9" width="12" height="3" fill="#36A2EB" />
    <rect x="2" y="14" width="8" height="3" fill="#FFCE56" />
    <rect x="2" y="19" width="4" height="3" fill="#4BC0C0" />
    <rect x="0" y="2" width="2" height="24" fill="#9BB5BE" />
  </svg>
);

const CustomLayoutGridIcon = () => (
  <svg width="65" height="65" viewBox="0 0 24 24">
    <rect x="2" y="4" width="10" height="6" fill="#FF6384" />
    <rect x="14" y="4" width="10" height="6" fill="#36A2EB" />
    <rect x="2" y="14" width="10" height="6" fill="#FFCE56" />
    <rect x="14" y="14" width="10" height="6" fill="#4BC0C0" />
  </svg>
);

// const CustomLayoutGridHorzontalIcon = ({ backgroundColorCard }) => (
//   <svg width="300" height="75" viewBox="0 0 300 75">
//     <rect x="0" y="0" width="65" height="65" fill={backgroundColorCard} rx="5" ry="5" />
//     <foreignObject x="15" y="15" width="35" height="35">
//       <FaClock size="100%" color="#FF6384" />
//     </foreignObject>
//     <rect x="75" y="0" width="65" height="65" fill={backgroundColorCard} rx="5" ry="5" />
//     <foreignObject x="90" y="15" width="35" height="35">
//       <FaHdd size="100%" color="#36A2EB" />
//     </foreignObject>
//     <rect x="150" y="0" width="65" height="65" fill={backgroundColorCard} rx="5" ry="5" />
//     <foreignObject x="165" y="15" width="35" height="35">
//       <FaTachometerAlt size="100%" color="#FFA726" />
//     </foreignObject>
//     <rect x="225" y="0" width="65" height="65" fill={backgroundColorCard} rx="5" ry="5" />
//     <foreignObject x="240" y="15" width="35" height="35">
//       <FaMemory size="100%" color="#4BC0C0" />
//     </foreignObject>
//   </svg>
// );
const CustomLayoutGridVerticalIcon = () => (
  <svg width="75" height="95" viewBox="0 0 75 95">
    <rect x="0" y="0" width="65" height="25" fill="#FF6384" rx="5" ry="5" />
    <foreignObject x="15" y="5" width="35" height="15">
      <LuNetwork size="100%" color="#FFFFFF" />
    </foreignObject>
    <rect x="0" y="35" width="65" height="25" fill="#36A2EB" rx="5" ry="5" />
    <foreignObject x="15" y="40" width="35" height="15">
      <LuNetwork size="100%" color="#FFFFFF" />
    </foreignObject>
    <rect x="0" y="70" width="65" height="25" fill="#FFA726" rx="5" ry="5" />
    <foreignObject x="15" y="75" width="35" height="15">
      <LuNetwork size="100%" color="#FFFFFF" />
    </foreignObject>
  </svg>
);

const CustomProgressIcon = () => (
  <svg width="180" height="24" viewBox="0 0 200 24">
    <rect x="0" y="0" width="200" height="24" fill="#4A4A4A" rx="5" ry="5" />
    <rect x="140" y="0" width="60" height="24" fill="#FFA726" rx="5" ry="5" />
  </svg>
);
const AreaChartIcon = () => (
  <svg width="70" height="70" viewBox="0 0 24 24">
    <rect x="0" y="0" width="24" height="24" fill="none" />
    <path fill="#4BC0C0" d="M5 18L11 10L16 15L22 6L22 18z" />
    <path fill="#4BC0C0" d="M5 18L11 10L16 15L22 6L22 18L5 18z" fillOpacity="0.5" />
    <path fill="#4BC0C0" d="M5 18L11 10L16 15L22 6L22 18L5 18z" fillOpacity="0.3" />
    <path fill="#4BC0C0" d="M5 18L11 10L16 15L22 6L22 18L5 18z" fillOpacity="0.2" />
    <path d="M4 19H22V21H4z" fill="#FFCE56" />
    <path d="M3 3V21H5V3z" fill="#FFCE56" />
  </svg>
);
const SpeedChartIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" style={{ marginBottom: '-24px' }}>
    <path fill="none" stroke="#FFA726" strokeWidth="2" d="M2 12a10 10 0 0 1 20 0" />
    <circle cx="12" cy="12" r="1" fill="#CFD8DC" />
    <path fill="#CFD8DC" d="M12 6l-1 5h2l-1-8z" />
  </svg>
);
// const renderIcon = (type, backgroundColorCard) => {
const renderIcon = (type: string) => {
  switch (type) {
    case 'pie':
      return <PieChartIcon />;
    case 'bar':
      return <BarChartIcon />;
    case 'bar-horizontal':
      return <CustomBarChartHorizontalIcon />;
    case 'list':
      return <CustomLayoutGridIcon />;
    // case 'list-horizontal':
    //   return <CustomLayoutGridHorzontalIcon backgroundColorCard={backgroundColorCard} />;
    case 'list-vertical':
      return <CustomLayoutGridVerticalIcon />;
    case 'progress':
      return <CustomProgressIcon />;
    case 'area':
      return <AreaChartIcon />;
    case 'radar':
      return <AiOutlineRadarChart size={70} style={{ color: '#36A2EB' }} />;
    case 'speed':
      return <SpeedChartIcon />;
    default:
      return <BsClipboardData size={50} />;
  }
};

const NoData = ({ type, isLoading }: { type: string; isLoading?: boolean | undefined }) => {
  // const theme = useTheme();
  // const isLight = theme.palette.mode === 'light';
  // const backgroundColorCard = theme.palette.grey[isLight ? 50 : 500_12];

  return (
    <Box
      sx={{
        // mt: 2,
        height: type === 'progress' ? '100px' : '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // gap: 1,
        direction: 'rtl',
      }}
    >
      {/* {renderIcon(type, backgroundColorCard)} */}
      {renderIcon(type)}
      <Typography variant="h6" sx={{ mt: 1 }}>
        {isLoading ? ' ... در حال پردازش اطلاعات  ' : 'اطلاعاتی وجود ندارد'}
      </Typography>
    </Box>
  );
};

export default NoData;
