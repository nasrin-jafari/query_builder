import PieChart from '@/components/chart/PieChart';
import CardBox from '@/layout/CardBox';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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

  const eventDataChart =
    data.events?.length > 0
      ? data.events.map((item) => ({
          ...item,
          redirectTo: `/hosts/hostManagement/analysis`,
          query: { ...router.query, eventType: item.en, eventTypeFa: item.fa },
        }))
      : [];
  return (
    <>
      <PieChart data={eventDataChart} />
    </>
  );
};

export default Logs;
