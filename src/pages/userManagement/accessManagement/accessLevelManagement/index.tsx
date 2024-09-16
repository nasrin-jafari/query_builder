import { axiosMethod } from '@/api';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
// import { CustomButton } from '@/components';
import { en } from '@/constants/en';
import { fa } from '@/constants/fa';
// import { useAceessBtn } from '@/hooks/useAceessBtn';
import UseApi from '@/hooks/UseApi';

interface CheckboxListProps {
  data: Record<string, any>;
}
interface PermissionData {
  [key: string]: string[] | Record<string, string[]>;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ data }) => {
  //   const { showBtnCreate } = useAceessBtn();
  const [checkedItems, setCheckedItems] = useState<Record<string, string[]>>({});
  const theme = useTheme();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : fa;
  const isLight = theme.palette.mode === 'light';

  const { data: checkedData } = UseApi<PermissionData>(
    `/access_control/roles/permissions/${router.query.roleId}/`
  );

  useEffect(() => {
    const updatedCheckedItems: Record<string, string[]> = {};

    if (checkedData?.permissions) {
      const permissionsData = checkedData.permissions as Record<
        string,
        string[] | Record<string, string[]>
      >;

      for (const key in permissionsData) {
        if (Array.isArray(permissionsData[key])) {
          updatedCheckedItems[key] = permissionsData[key] as string[];
        } else {
          const nestedData = permissionsData[key] as Record<string, string[]>;
          for (const nestedKey in nestedData) {
            updatedCheckedItems[`${key}_${nestedKey}`] = nestedData[nestedKey];
          }
        }
      }

      setCheckedItems(updatedCheckedItems);
    }
  }, [checkedData?.permissions]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked
        ? [...(prevState[name] || []), value]
        : prevState[name].filter((item) => item !== value),
    }));
  };

  const generateDataForCheckedItems = async () => {
    const permissionsData = Object.fromEntries(
      Object.entries(checkedItems).filter(([key, values]) => {
        return !key.startsWith('role_name_') && values.length > 0;
      })
    );
    const dataForCheckedItems = {
      permissions: permissionsData,
      role_name: router.query.name,
    };
    try {
      await axiosMethod.put(`/access_control/roles/permissions/set/`, dataForCheckedItems);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {Object.keys(data).map((key) => (
        <Accordion
          key={key}
          sx={{
            bgcolor: 'transparent',
          }}
        >
          <AccordionSummary expandIcon={<IoIosArrowDown />}>
            <Typography variant="h6">{t[key as keyof typeof t] ?? key}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: Array.isArray(data[key]) ? 'row' : 'column',
                gap: '12px',
                bgcolor: 'transparent',
              }}
            >
              {Array.isArray(data[key])
                ? data[key].map((value: string) => (
                    <Box key={value} sx={{ padding: '4px 12px 4px 4px', flex: 1 }}>
                      <Checkbox
                        name={key}
                        value={value}
                        onChange={handleCheckboxChange}
                        checked={checkedItems[key]?.includes(value) ?? false}
                        sx={{
                          color: '#e57b2d',
                          '&.Mui-checked': {
                            color: '#e57b2d',
                          },
                        }}
                      />
                      <label>{t[value as keyof typeof t]}</label>
                    </Box>
                  ))
                : Object.keys(data[key]).map((nestedKey) => (
                    <Box
                      key={nestedKey}
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          display: 'flex',
                          border: '1px solid blue',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: isLight ? '#eeeeee' : '#09151F',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            width: '300px',
                            padding: '8px',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                          }}
                          variant="h6"
                        >
                          {t[nestedKey as keyof typeof t] ?? nestedKey}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                          {data[key][nestedKey].map((value: string) => (
                            <Box key={value}>
                              <Checkbox
                                name={`${key}_${nestedKey}`}
                                value={value}
                                onChange={handleCheckboxChange}
                                checked={
                                  checkedItems[`${key}_${nestedKey}`]?.includes(value) ?? false
                                }
                                sx={{
                                  color: '#e57b2d',
                                  '&.Mui-checked': {
                                    color: '#e57b2d',
                                  },
                                }}
                              />
                              <label>{t[value as keyof typeof t]}</label>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* {showBtnCreate && ( */}
      <Button
        size="large"
        onClick={generateDataForCheckedItems}
        style={{
          marginTop: '40px',
          background: '#e57b2d',
          padding: '8px',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        افزودن دسترسی‌ها
      </Button>
      {/* )} */}
    </div>
  );
};

const AccessLevelManagement: React.FC = () => {
  const { data } = UseApi('/access_control/permissions/');
  console.log(data);
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return <div>Error: Invalid data format</div>;
  }

  return <CheckboxList data={data as Record<string, any>} />;
};

export default AccessLevelManagement;
