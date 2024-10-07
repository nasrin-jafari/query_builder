import {
  Box,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import Link from 'next/link';
import { useThemeContext } from '@/lib/theme/ThemeContext';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface SubTechnique {
  id: string;
  title: string;
  description: string;
}

interface Technique {
  id: string;
  title: string;
  description: string;
  sub_techniques: SubTechnique[];
}

interface AttackCategory {
  id: string;
  title: string;
  description: string;
  body: Technique[];
  color: string;
}

interface SidebarProps {
  data: AttackCategory[];
}

const Mitre: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [openTechniques, setOpenTechniques] = useState<string | null>(null);
  const { data = [] } = UseApi<AttackCategory[]>('/mitre_attack/list/');
  const { isLightMode } = useThemeContext();

  const [colorsMap, setColorsMap] = useState<{ [key: string]: string }>({});

  const filteredData = data?.find((item) => item.title === selectedTitle);

  const handleClick = (title: string) => {
    setOpenTechniques((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0 && !selectedTitle) {
      setSelectedTitle(data[0].title);
    }
  }, [data, selectedTitle]);

  const colorsRandom = [
    {
      bg: '#EBFBF7',
      colorBadge: '#1BBC98',
      color: '#fff',
    },
    {
      bg: '#FBDDDD',
      colorBadge: '#EB5757',
      color: '#fff',
    },
    {
      bg: '#F3F2FB',
      colorBadge: '#8379D5',
      color: '#fff',
    },
    {
      bg: '#FEF5ED',
      colorBadge: '#F58634',
      color: '#fff',
    },
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorsRandom.length);
    return colorsRandom[randomIndex].colorBadge;
  };

  // Set random colors for each technique only once
  useEffect(() => {
    if (filteredData) {
      const newColorsMap: { [key: string]: string } = {};
      filteredData.body.forEach((technique) => {
        if (!colorsMap[technique.id]) {
          newColorsMap[technique.id] = getRandomColor();
        }
      });
      setColorsMap((prev) => ({ ...prev, ...newColorsMap }));
    }
  }, [filteredData]);

  return (
    <PageBox title="حملات MITRE">
      <Box display="flex">
        {/* سایدبار */}
        <Box
          width="20%"
          bgcolor="lightgray"
          p={2}
          sx={{ background: theme.palette.grey[300], borderRadius: '18px' }}
        >
          <Typography variant="h5">دسته بندی</Typography>
          <List sx={{ background: 'transparent' }}>
            {data?.map((category: AttackCategory) => (
              <ListItem
                sx={{ display: 'flex', alignItems: 'center' }}
                key={category.id}
                button
                onClick={() => setSelectedTitle(category.title)}
              >
                <ListItemText primary={`${category.title}`} />
                <Box
                  sx={{
                    background: isLightMode ? '#F4D8D9' : '#EB5757',
                    borderRadius: '50%',
                    padding: '4px',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isLightMode ? '#EB5757' : '#fff',
                  }}
                >
                  {category.body.length}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box width="80%" p={2}>
          {filteredData ? (
            <>
              <Typography variant="h4" gutterBottom sx={{ color: filteredData.color }}>
                {filteredData?.title}
              </Typography>

              <Box
                flexWrap="wrap"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                  gap: 1,
                  height: '700px',
                  overflow : 'auto'
                }}
              >
                {filteredData?.body?.map((technique: Technique) => {
                  const randomColor = colorsMap[technique.id]; // Use stored color

                  return (
                    <Box
                      key={technique.id}
                      mb={2}
                      flexDirection="column"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '399px',
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          borderRadius: '12px',
                          padding: '10px',
                          backgroundColor: randomColor,
                          pb: '12px',
                        }}
                      >
                        <Link
                          href={{
                            pathname: '/attacks/mitre/mitreDetails',
                            query: {
                              mitreId: `${filteredData.id}_${technique.id}`,
                              title: filteredData.title,
                            },
                          }}
                          style={{ display: 'flex', alignItems: 'center' }}
                          passHref
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#fff',
                            }}
                          >
                            {technique.title}
                          </Typography>{' '}
                        </Link>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '48px',
                            gap: 1,
                          }}
                        >
                          <Chip label={technique.sub_techniques.length} sx={{ color: '#fff' }} />
                          {technique.sub_techniques.length > 0 && (
                            <div
                              onClick={() => handleClick(technique.title)}
                              style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {openTechniques === technique.title ? (
                                <IoIosArrowUp style={{ fontSize: '18px', color: '#fff' }} />
                              ) : (
                                <IoIosArrowDown style={{ fontSize: '18px', color: '#fff' }} />
                              )}
                            </div>
                          )}
                        </Box>
                      </Box>
                      <Collapse
                        in={openTechniques === technique.title}
                        sx={{
                          backgroundColor: randomColor, // Use the same random color here
                          width: '100%',
                          borderRadius: '0 0 10px 10px',
                          mt: '-10px',
                        }}
                      >
                        <Box
                          p={2}
                          sx={{
                            borderRadius: '4px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {technique.sub_techniques.map((sub: SubTechnique) => (
                            <Box key={sub.id} mb={1}>
                              <Link
                                href={{
                                  pathname: '/attacks/mitre/mitreDetails',
                                  query: {
                                    mitreId: `${filteredData.id}_${technique.id}_${sub.id}`,
                                    title: sub.title,
                                  },
                                }}
                                passHref
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: '#333',
                                    cursor: 'pointer',
                                    background: '#fff',
                                    borderRadius: '8px',
                                    padding: '4px',
                                    textAlign: 'right',
                                  }}
                                >
                                  {sub.title}
                                </Typography>
                              </Link>
                            </Box>
                          ))}
                        </Box>
                      </Collapse>
                    </Box>
                  );
                })}
              </Box>
            </>
          ) : (
            <Typography variant="h6">یک دسته بندی را انتخاب کنید</Typography>
          )}
        </Box>
      </Box>
    </PageBox>
  );
};

export default Mitre;
