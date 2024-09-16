import NoData from '@/utils/NoData';
import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';
import { ChartDataItem } from './type';

interface BarChartProps {
  data?: ChartDataItem[];
  isLoading: boolean;
}

const BarChartHorizontal: React.FC<BarChartProps> = ({ data = [], isLoading }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const initializeChart = (): any => {
    const chartDom = chartContainerRef.current;
    if (chartDom) {
      const chartInstance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

      // Define color palette
      const colorPalette = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];

      const option = {
        grid: {
          left: '20%',
        },
        toolbox: {
          feature: {
            saveAsImage: {
              iconStyle: {
                borderColor: theme.palette.grey[900],
              },
            },
          },
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: theme.palette.grey[900],
            },
          },
          splitLine: {
            lineStyle: {
              color: 'none',
            },
          },
        },
        yAxis: {
          type: 'category',
          data: data?.map((item) => item.en),
          axisLine: {
            lineStyle: {
              color: theme.palette.grey[900],
            },
          },
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: (params: any) => {
            const dataItem = data[params[0].dataIndex];
            return `${dataItem.en}: ${params[0].value}`;
          },
        },
        series: [
          {
            data: data?.map((item) => item.value),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            itemStyle: {
              color: function (params: any) {
                return colorPalette[params.dataIndex % colorPalette.length];
              },
            },
            emphasis: {
              focus: 'series',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
              formatter: (params: any) => {
                const dataItem = data[params[0].dataIndex];
                return `${dataItem.name}: ${params[0].value}`;
              },
            },
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
  };

  useEffect(() => {
    if (data.length > 0) {
      initializeChart();
    }
  }, [data, theme.palette.grey]);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {data.length === 0 ? (
        <NoData type="bar" isLoading={isLoading} />
      ) : (
        <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }}></div>
      )}
    </div>
  );
};

export default BarChartHorizontal;
