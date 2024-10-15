import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import CustomTooltip from '@/components/common/CustomToolTip';

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
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

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
        borderRadius: '14px',
        width: '120px',
        background: theme.palette.grey[100],
      }}
    >
      <Box
        ref={dropdownRef}
        sx={{
          color: theme.palette.grey[300],
          fontSize: '13px',
          width: '70px',
          borderRadius: isOpen ? '10px 10px   0 0 ' : '10px',
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[100],
          position: 'relative',
          height: '32px',
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
          <Typography
            sx={{
              fontSize: '13px',
              // mt: isOpen ? '-3px' : null
            }}
          >
            {selectedItem !== null
              ? listOfItems.find((item) => item.value === selectedItem)?.label
              : listOfItems[0]?.label}
          </Typography>

          <IoIosArrowDown
            style={{
              fontSize: '20px',
              color: theme.palette.grey[700],
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'all .4s ease-in-out',
              // marginTop: isOpen ? '-8px' : '-4px',
              marginTop: '-4px',
            }}
          />
        </Box>
        <Box
          sx={{
            paddingTop: '2px',
            display: isOpen ? 'block' : 'none',
            position: 'absolute',
            top: '28px',
            zIndex: '999',
            backgroundColor: theme.palette.grey[100],
            right: '-1px',
            left: '-1px',
            borderRadius: '0 0 10px 10px',
            border: `1px solid ${theme.palette.grey[400]}`,
            overflow: 'hidden',
          }}
        >
          {listOfItems.map((item) => (
            <Box
              sx={{
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderBottom:
                  item.id !== listOfItems.length ? `1px solid ${theme.palette.grey[400]}` : 'none',
                '&:hover': {
                  background: theme.palette.primary.main,
                  color: theme.palette.common.white,
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
      <CustomTooltip title="بارگذاری مجدد">
        <IconButton sx={{ ml: '4px' }} onClick={handleUpdateData}>
          <FiRefreshCw style={{ fontSize: '20px', color: theme.palette.grey[200] }} />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
};

export default FetchTimer;
