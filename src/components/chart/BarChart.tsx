import { ConvertDates } from '@/utils/ConvertDates';
import NoData from '@/utils/NoData';
import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import React, { FC, useRef } from 'react';
import { ChartDataItem } from './type';

interface BarChartProps {
  data?: ChartDataItem[];
  isLoading: boolean;
}

const BarChart: FC<BarChartProps> = ({ data = [], isLoading }) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  const categoryData: string[] = data?.map((item) => {
    if (item.timestamp) {
      return ConvertDates(item.timestamp);
    }
    if (item.timestamps) {
      return ConvertDates(item.timestamps);
    }
    if (item.date) {
      return ConvertDates(item.date);
    }
    return item.en || '';
  });

  const barData: number[] = data?.map((item) => item.value ?? 0);

  const initializeChart = () => {
    if (chartRef.current) {
      const chartInstance =
        echarts.getInstanceByDom(chartRef.current) || echarts.init(chartRef.current);

      const option = {
        toolbox: {
          feature: {
            saveAsImage: {
              iconStyle: {
                borderColor: theme.palette.grey[900],
              },
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['bar'],
        },
        dataZoom: [
          {
            type: 'slider',
            start: 0,
            end: 100,
          },
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
        ],
        xAxis: {
          data: categoryData,
          axisLabel: {
            color: theme.palette.grey[900],
          },
        },
        yAxis: {
          axisLabel: {
            color: theme.palette.grey[900],
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: theme.palette.grey[700],
            },
          },
        },
        series: [
          {
            type: 'bar',
            name: 'value',
            data: barData,
            itemStyle: {
              color: theme.palette.info.light,
            },
          },
          {
            type: 'custom',
            name: 'error',
            itemStyle: {
              borderWidth: 0,
            },
            renderItem: (_: any, api: any) => {
              const xValue = api.value(0);
              const highPoint = api.coord([xValue, api.value(1)]);
              const lowPoint = api.coord([xValue, api.value(2)]);
              const halfWidth = (api.size!([1, 0]) as number[])[0] * 0.1;
              const style = api.style({
                stroke: api.visual('color') as string,
                fill: undefined,
              });

              return {
                type: 'group',
                children: [
                  {
                    type: 'line',
                    transition: ['shape'],
                    shape: {
                      x1: highPoint[0] - halfWidth,
                      y1: highPoint[1],
                      x2: highPoint[0] + halfWidth,
                      y2: highPoint[1],
                    },
                    style: style,
                  },
                  {
                    type: 'line',
                    transition: ['shape'],
                    shape: {
                      x1: highPoint[0],
                      y1: highPoint[1],
                      x2: lowPoint[0],
                      y2: lowPoint[1],
                    },
                    style: style,
                  },
                  {
                    type: 'line',
                    transition: ['shape'],
                    shape: {
                      x1: lowPoint[0] - halfWidth,
                      y1: lowPoint[1],
                      x2: lowPoint[0] + halfWidth,
                      y2: lowPoint[1],
                    },
                    style: style,
                  },
                ],
              };
            },
            encode: {
              x: 0,
              y: [1, 2],
            },
            z: 100,
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

  React.useEffect(() => {
    if (data.length > 0) {
      initializeChart();
    }
  }, [data, theme.palette.grey]);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {data.length === 0 ? (
        <NoData type="bar" isLoading={isLoading} />
      ) : (
        <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
      )}
    </div>
  );
};

export default BarChart;
