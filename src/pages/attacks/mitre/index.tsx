import {
  Box,
  Chip,
  ListItem,
  ListItemText,
  Typography,
  List,
  Collapse,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import PageBox from '@/components/common/PageBox';
import UseApi from '@/hooks/UseApi';
import Link from 'next/link';

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

  const filteredData = data?.find((item) => item.title === selectedTitle);

  const handleClick = (title: string) => {
    setOpenTechniques((prev) => (prev === title ? null : title));
  };

  return (
    <PageBox title="حملات MITRE" description="توضیحات">
      <Box display="flex" height="100vh">
        {/* سایدبار */}
        <Box width="20%" bgcolor="lightgray" p={2} sx={{ background: theme.palette.grey[300] }}>
          <Typography variant="h6">دسته بندی</Typography>
          <List sx={{ background: 'transparent' }}>
            {data?.map((category: AttackCategory) => (
              <ListItem key={category.id} button onClick={() => setSelectedTitle(category.title)}>
                <ListItemText primary={`${category.title} (${category.body.length})`} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* محتوای اصلی */}
        <Box width="80%" p={2}>
          {filteredData ? (
            <>
              <Typography variant="h4" gutterBottom sx={{ color: filteredData.color }}>
                {filteredData.title}
              </Typography>

              <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                {filteredData.body.map((technique: Technique) => (
                  <Box key={technique.id} mb={2} display="flex" flexDirection="column">
                    <Box display="flex" alignItems="center" mb={1}>
                      <Link
                        href={{
                          pathname: '/attacks/mitre/mitreDetails',
                          query: {
                            mitreId: `${filteredData.id}_${technique.id}`,
                            title: filteredData.title,
                          },
                        }}
                        passHref
                      >
                        <Chip
                          label={`${technique.title} (${technique.sub_techniques.length})`}
                          sx={{
                            fontSize: 14,
                            height: '40px',
                            minWidth: '200px',
                            backgroundColor: `${filteredData.color}20`,
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: `${filteredData.color}40`,
                            },
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            padding: '0 8px',
                          }}
                        />
                      </Link>
                      {technique.sub_techniques.length > 0 && (
                        <div
                          onClick={() => handleClick(technique.title)}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            // ml: 1,
                          }}
                        >
                          {openTechniques === technique.title ? (
                            <FaArrowUpLong style={{ fontSize: '16px' }} />
                          ) : (
                            <FaArrowDown style={{ fontSize: '16px' }} />
                          )}
                        </div>
                      )}
                    </Box>
                    <Collapse in={openTechniques === technique.title}>
                      <Box
                        mt={1}
                        p={2}
                        sx={{
                          backgroundColor: '#f5f5f5',
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
                              <Typography variant="body2" sx={{ color: '#333', cursor: 'pointer' }}>
                                {sub.title}
                              </Typography>
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                ))}
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
