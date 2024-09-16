import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import React, { FC, useRef, useEffect } from 'react';
import NoData from '@/utils/NoData';
import { ChartDataItem } from './type';
import { ConvertDates } from '@/utils/ConvertDates';

interface BarChartProps {
  data?: ChartDataItem[];
  isLoading: boolean;
}

const BiaxialLineChart: FC<BarChartProps> = ({ data = [], isLoading }) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  const initializeChart = () => {
    if (chartRef.current) {
      const chartInstance =
        echarts.getInstanceByDom(chartRef.current) || echarts.init(chartRef.current);

      const formattedDates = data.map((item) => {
        return item.date ? ConvertDates(item.date) : null; // Return null if date is missing
      });

      const option = {
        color: [theme.palette.info.main, theme.palette.error.main, theme.palette.success.main],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: [
            { name: 'Add', icon: 'circle', textStyle: { color: theme.palette.info.main } },
            { name: 'Modified', icon: 'circle', textStyle: { color: theme.palette.error.main } },
            { name: 'Delete', icon: 'circle', textStyle: { color: theme.palette.success.main } },
          ],
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          data: formattedDates,
          axisLabel: {
            color: theme.palette.grey[900],
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: theme.palette.grey[900],
          },
        },
        series: [
          {
            name: 'Add',
            type: 'line',
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: data.map((item) => item.add),
          },
          {
            name: 'Modified',
            type: 'line',
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: data.map((item) => item.modified),
          },
          {
            name: 'Delete',
            type: 'line',
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: data.map((item) => item.delete),
          },
        ],
      };

      chartInstance.setOption(option);

      const resizeChart = () => {
        chartInstance.resize();
      };

      window.addEventListener('resize', resizeChart);

      return () => {
        chartInstance.dispose();
        window.removeEventListener('resize', resizeChart);
      };
    }
    return null;
  };

  useEffect(() => {
    if (data.length > 0) {
      initializeChart();
    }
  }, [data, theme.palette.grey]);

  return (
    <div style={{ width: '100%', height: '350px' }}>
      {data.length === 0 ? (
        <NoData type="bar" isLoading={isLoading} />
      ) : (
        <div ref={chartRef} style={{ width: '100%', height: '350px' }}></div>
      )}
    </div>
  );
};

export default BiaxialLineChart;
