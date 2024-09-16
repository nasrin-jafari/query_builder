import NoData from '@/utils/NoData';
import { useMediaQuery, useTheme } from '@mui/material';
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

interface GaugeChartProps {
  data: string;
  name: string;
  isLoading: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ data, name, isLoading }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const initializeChart = (): any => {
    const chartDom = chartContainerRef.current;
    if (chartDom) {
      const chartInstance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

      const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            center: ['50%', '75%'],
            radius: isXs ? '70%' : '90%',
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: isXs ? 4 : 6,
                color: [
                  [0.25, theme.palette.error.main],
                  [0.5, theme.palette.warning.light],
                  [0.75, theme.palette.info.light],
                  [1, theme.palette.success.main],
                ],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: isXs ? 14 : 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: isXs ? 8 : 12,
              lineStyle: {
                color: 'auto',
                width: isXs ? 1 : 2,
              },
            },
            splitLine: {
              length: isXs ? 14 : 20,
              lineStyle: {
                color: 'auto',
                width: isXs ? 3 : 5,
              },
            },
            axisLabel: {
              color: theme.palette.grey[900],
              fontSize: isXs ? 10 : 14,
              distance: isXs ? -30 : -40,
              rotate: 'tangential',
              formatter: function (value: number) {
                if (value === 0.875) {
                  return '75 الی 100';
                } else if (value === 0.625) {
                  return '50 الی 75';
                } else if (value === 0.375) {
                  return '25 الی 50';
                } else if (value === 0.125) {
                  return '0 الی 25';
                }
                return '';
              },
            },
            title: {
              offsetCenter: [0, '-10%'],
              fontSize: isXs ? 14 : 20,
              color: theme.palette.grey[900],
              fontFamily: 'vazir',
            },
            detail: {
              fontSize: isXs ? 20 : 30,
              offsetCenter: [0, '-35%'],
              valueAnimation: true,
              formatter: function (value: number) {
                return Math.round(value * 100) + '';
              },
              color: 'inherit',
            },
            data: [
              {
                value: data ? parseFloat(data) / 100 : 0,
                name: `${name}`,
              },
            ],
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
    if (data) {
      initializeChart();
    }
  }, [data, theme, isXs]);

  return (
    <div
      style={{
        width: '100%',
        height: isXs ? '100px' : '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data ? (
        <div
          ref={chartContainerRef}
          style={{
            width: '60%',
            height: isXs ? '20vh' : '40vh',
            maxWidth: '400px',
            maxHeight: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <NoData type="speed" isLoading={isLoading} />
      )}
    </div>
  );
};

export default GaugeChart;
