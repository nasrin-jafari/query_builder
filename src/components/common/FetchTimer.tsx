import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';

const listOfItems = [
  { id: 1, label: 'off', value: null },
  { id: 2, label: '2s', value: 2 },
  { id: 3, label: '5s', value: 5 },
  { id: 4, label: '10s', value: 10 },
  { id: 5, label: '20s', value: 20 },
];

interface FetchTimerProps {
  mb?: number;
}

const FetchTimer: React.FC<FetchTimerProps> = ({ mb }) => {
  const theme = useTheme();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const isLight = theme.palette.mode === 'light';
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  // Load the initial value from localStorage or use the default value
  const [selectedItem, setSelectedItem] = useState<number | null>(() => {
    const savedValue = localStorage.getItem('fetchTimerValue');
    return savedValue !== null ? JSON.parse(savedValue) : listOfItems[0]?.value;
  });

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (value: number | null) => {
    if (selectedItem !== value) {
      setSelectedItem(value);
      // Save the selected value to localStorage
      localStorage.setItem('fetchTimerValue', JSON.stringify(value));
    }
  };

  const updateData = () => {
    const { pathname, query } = router;
    router.replace({ pathname, query }, undefined, { shallow: true });
  };

  const handleUpdateData = () => {
    updateData();
  };

  useEffect(() => {
    if (selectedItem !== null) {
      const interval = setInterval(() => {
        updateData();
      }, selectedItem * 1000);

      return () => {
        clearInterval(interval);
      };
    }
    return undefined;

  }, [selectedItem, router.query]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: mb ? mb : null,
        padding: '5px',
        boxShadow: 1,
        border: `1px solid ${isLight ? '#94a7bf' : '#313A43'}`,
                borderRadius: 1,
        width: '120px',
        background: theme.palette.grey[300],
      }}
    >
      <Box
        ref={dropdownRef}
        sx={{
          color: isLight ? '#06465d' : '#fff',
          fontSize: '13px',
          width: '70px',
          borderRadius: '10px',
          border: `1px solid ${isLight ? '#94a7bf' : '#313A43'}`,
          backgroundColor: isLight ? '#fff' : '#1a242e',
          position: 'relative',
        }}
      >
        <Box
          onClick={toggleDropdown}
          sx={{
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {selectedItem !== null
            ? listOfItems.find((item) => item.value === selectedItem)?.label
            : listOfItems[0]?.label}
          <IoIosArrowDown
            style={{
              fontSize: '20px',
              color: '#91A5BE',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'all .4s ease-in-out',
            }}
          />
        </Box>
        <Box
          sx={{
            paddingTop: '2px',
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            top: '31px',
            zIndex: '999',
            backgroundColor: isLight ? '#fff' : '#1a242e',
            right: '-1px',
            left: '-1px',
            borderRadius: '0 0 10px 10px',
            border: `1px solid ${isLight ? '#94a7bf' : '#313A43'}`,
            overflow: 'hidden',
          }}
        >
          {listOfItems.map((item) => (
            <Box
              sx={{
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderBottom: item.id !== listOfItems.length - 1
                  ? `1px solid ${isLight ? '#94a7bf' : '#313A43'}`
                  : 'none',
                '&:hover': {
                  background: theme.palette.primary.main,
                },
              }}
              key={item.id}
              onClick={() => {
                handleItemClick(item.value);
                setOpen(false);
              }}
              id={item.label}
            >
              <Box
                sx={{
                  display: 'inline',
                  opacity: item.value === selectedItem ? '1' : '0',
                  transition: 'all .25s ease-in-out',
                  paddingRight: '4px',
                  color: '#f58634',
                }}
              >
                <GoDotFill />
              </Box>
              <Typography sx={{ fontSize: '13px' }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Tooltip title="بارگذاری مجدد">
        <IconButton sx={{ ml: '4px' }} onClick={handleUpdateData}>
          <FiRefreshCw style={{ fontSize: '20px' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FetchTimer;
