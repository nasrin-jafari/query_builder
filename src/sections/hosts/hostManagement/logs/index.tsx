import PieChart from '@/components/chart/PieChart';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import CardCharts from '@/components/common/CardCharts';

interface CurrentIndex {
  [key: string]: number;
}

interface PiChartEntry {
  total: number;
}

interface PiChartCategory {
  [key: string]: PiChartEntry;
}

interface PiChart {
  [category: string]: PiChartCategory;
}

interface Event {
  en: string;
  value: number;
  fa: string;
  redirectTo: string;
}

interface ChartData {
  date: number;
  value: number;
}

interface DataStructure {
  pi_chart: PiChart;
  events: Event[];
  events_chart: ChartData[];
  quarantined_chart: ChartData[];
}

interface LogsProps {
  data: DataStructure;
}

const Logs: FC<LogsProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<CurrentIndex>({});
  const router = useRouter();
  useEffect(() => {
    if (data) {
      const initialIndex: CurrentIndex = {};
      Object.entries(data.pi_chart).forEach(([title]) => {
        initialIndex[title] = 0;
      });
      setCurrentIndex(initialIndex);
    }
  }, [data]);

  const handleNext = (title: string) => {
    const currentMaxIndex = Object.keys(data.pi_chart[title]).length - 4;
    if (currentIndex[title] < currentMaxIndex) {
      setCurrentIndex((prevIndex) => ({
        ...prevIndex,
        [title]: prevIndex[title] + 4,
      }));
    }
  };
  const handlePrev = (title: string) => {
    if (currentIndex[title] > 0) {
      setCurrentIndex((prevIndex) => ({
        ...prevIndex,
        [title]: prevIndex[title] - 4,
      }));
    }
  };

  return (
    <>
      {data &&
        Object.entries(data.pi_chart)?.map(([title, value]) => {
          const startIndex = currentIndex[title] || 0;
          const slicedData = Object.entries(value)
            // .slice(startIndex, startIndex + 4)
            .map(([key, value]) => ({
              redirectTo: `/hosts/hostManagement/logs/detailsLog`,
              query: { ...router.query, logId: router.query.logId, logs: title, key },
              en: key,
              value: value.total,
            }));
          return (
            <Grid item key={title} xs={12} md={4}>
              <CardCharts>
                <Box sx={{ direction: 'rtl', textAlign: 'left' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle1">{title}</Typography>
                    <Box>
                      <IconButton onClick={() => handlePrev(title)}>
                        <IoIosArrowBack size={16} />
                      </IconButton>
                      <IconButton onClick={() => handleNext(title)}>
                        <IoIosArrowForward size={16} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Divider sx={{ borderColor: '#39393D' }} />
                  <Box
                    sx={{
                      paddingTop: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        height: '200px',
                        direction: 'ltr',
                      }}
                    >
                      <PieChart data={slicedData} startIndex={startIndex} />
                    </Box>
                  </Box>
                </Box>
              </CardCharts>
            </Grid>
          );
        })}
    </>
  );
};

export default Logs;
