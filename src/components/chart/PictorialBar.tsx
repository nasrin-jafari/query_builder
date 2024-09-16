import { ConvertDates } from '@/utils/ConvertDates';
import NoData from '@/utils/NoData';
import { useTheme } from '@mui/material';
import * as echarts from 'echarts';
import React, { FC, useRef } from 'react';
import { ChartDataItem } from './type';

interface PictorialBarProps {
  data: ChartDataItem[];
  colors?: string[];
}

const PictorialBar: FC<PictorialBarProps> = ({ data = [], colors }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const initializeChart = (): any => {
    const chartDom = chartRef.current;
    if (chartDom) {
      const chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

      const option = {
        backgroundColor: 'transparent',
        color: colors || [theme.palette.success.main],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter: (params: any) => {
            const { name } = params[0];
            const originalValue = data.find(
              (item) => ConvertDates(item.date ? item.date : 0) === name
            )?.value;
            return `
              <div style="padding: 10px; color: ${theme.palette.grey[700]};">
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px;">${name}</div>
                <div style="font-size: 12px;">Value: <span style="color: ${theme.palette.success.main};">${originalValue}</span></div>
              </div>
            `;
          },
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: data.map((item) => ConvertDates(item.date ? item.date : 0)),
            axisLine: {
              lineStyle: {
                color: theme.palette.grey[900],
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: theme.palette.grey[900],
              },
            },
          },
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: colors?.[0] || theme.palette.info.light,
                },
                {
                  offset: 0.1,
                  color: colors?.[1] || theme.palette.success.main,
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: data.map((item) => item.value),
          },
        ],
      };

      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  };

  React.useEffect(() => {
    if (data.length > 0) {
      initializeChart();
    }
  }, [data, theme, colors]);

  return (
    <div style={{ width: '100%', height: '250px' }}>
      {data.length === 0 ? (
        <NoData type="bar" />
      ) : (
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
};

export default PictorialBar;
