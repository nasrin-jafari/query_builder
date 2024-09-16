import NoData from '@/utils/NoData';
import { Box, useTheme } from '@mui/material';
import * as echarts from 'echarts';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';

interface DataItem {
  en: string;
  value: number;
  redirectTo: string;
}

interface RadarChartProps {
  data: DataItem[];
}

const RadarChart: FC<RadarChartProps> = ({ data = [] }) => {
  const theme = useTheme();
  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const maxValue = data.length ? Math.max(...data.map((item) => item.value)) : 0;

  const initializeChart = (): any => {
    const chartDom = chartContainerRef.current;
    if (chartDom && data.length) {
      let chartInstance = echarts.getInstanceByDom(chartDom);
      if (!chartInstance) {
        chartInstance = echarts.init(chartDom);
      }

      const option = {
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontFamily: 'vazir',
          },
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            fontFamily: 'vazir',
            color: theme.palette.grey[900],
            fontSize: 14,
          },
        },
        radar: {
          indicator: data.map((item) => ({
            name: item.en,
            max: maxValue,
            nameTextStyle: {
              color: theme.palette.grey[900],
              fontSize: 12,
            },
          })),
          radius: '75%',
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              color: theme.palette.grey[700],
            },
          },
          splitLine: {
            lineStyle: {
              color: theme.palette.grey[700],
            },
          },
          splitArea: {
            areaStyle: {
              color: 'none',
            },
          },
        },
        series: [
          {
            name: 'Radar Chart',
            type: 'radar',
            data: [
              {
                value: data.map((item) => item.value),
                name: 'اطلاعات',
              },
            ],
            itemStyle: {
              borderRadius: 10,
              color: '#43eec6',
            },
            areaStyle: {
              color: '#14c8d4',
            },
          },
        ],
      };

      chartInstance.setOption(option);

      const resizeHandler = () => {
        if (chartInstance) {
          chartInstance.resize();
        }
      };

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
        chartInstance.dispose();
      };
    }
  };

  useEffect(() => {
    if (data.length) {
      initializeChart();
    }
  }, [data, theme.palette.grey, router]);

  return (
    <Box
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '340px' }}
    >
      {data.length === 0 ? (
        <NoData type="radar" />
      ) : (
        <div
          ref={chartContainerRef}
          className="radarChart"
          style={{ width: '100%', height: '355px' }}
        ></div>
      )}
    </Box>
  );
};

export default RadarChart;
