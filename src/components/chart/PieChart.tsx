import React, { FC, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ChartDataItem } from './type';
import NoData from '@/utils/NoData';

interface PieChartProps {
  data: ChartDataItem[];
  startIndex?: number;
  renderBottomText?: boolean;
  isLoading?: boolean;
  colors?: string[]; // New colors prop
}

const PieChart: FC<PieChartProps> = ({
  data = [],
  startIndex,
  renderBottomText = false,
  isLoading,
  colors = [], // Default to an empty array
}) => {
  const theme = useTheme();
  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const totalValue = data.reduce((acc, item) => acc + (item.value ?? 0), 0);

  const chartDataWithPercentage = data.map((item) => ({
    ...item,
    name: item.fa ? item.fa : item.en,
    value: item.value !== undefined ? ((item.value / totalValue) * 100).toFixed(2) : '0.00',
  }));

  const legendData =
    startIndex !== undefined
      ? data.slice(startIndex, startIndex + 4).map((item) => ({
          ...item,
          name: item.fa ? item.fa : item.en,
          value: item.value,
        }))
      : data.map((item) => ({
          ...item,
          name: item.fa ? item.fa : item.en,
          value: item.value,
        }));

  const initializeChart = () => {
    const chartDom = chartContainerRef.current;
    if (chartDom) {
      const chartInstance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

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
          trigger: 'item',
          formatter: (params: any) => {
            const originalValue = data.find(
              (item) => (item.fa ? item.fa : item.en) === params.name
            )?.value;
            const color = params.color;
            return `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${color}; margin-right: 5px;"></span> ${params.name} (${originalValue})`;
          },
          textStyle: {
            fontFamily: 'vazir',
          },
        },
        legend: {
          orient: renderBottomText ? 'horizontal' : 'vertical',
          icon: 'circle',
          left: renderBottomText ? 'center' : 'right',
          right: renderBottomText ? 'auto' : 10,
          top: renderBottomText ? 'bottom' : 'middle',
          data: legendData.map((item) => item.name),
          formatter: (name: string) => `${name}`,
          textStyle: {
            fontFamily: 'vazir',
            color: theme.palette.grey[900],
            fontSize: 14,
          },
        },
        series: [
          {
            name: `اطلاعات :`,
            type: 'pie',
            radius: renderBottomText ? ['40%', '55%'] : ['50%', '70%'],
            center: renderBottomText ? ['50%', '40%'] : ['30%', '50%'],
            padAngle: 2,
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              textStyle: {
                color: theme.palette.grey[900],
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: 'normal',
              },
              formatter: (params: any) => ` ${params.value}% `,
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10,
            },
            data: chartDataWithPercentage,
            color: colors.length ? colors : undefined, // Set colors if provided
            animation: true,
            animationDuration: 500,
            animationEasing: 'quadraticIn',
          },
        ],
      };

      chartInstance.setOption(option);

      chartInstance.on('click', (params: any) => {
        const checkOnClick = data.find(
          (item) => item.en === params.name || item.fa === params.name
        );
        if (checkOnClick?.redirectTo) {
          router.push({ pathname: checkOnClick.redirectTo, query: checkOnClick.query });
        }
      });

      const resizeChart = () => {
        chartInstance.resize();
      };

      window.addEventListener('resize', resizeChart);

      return () => {
        chartInstance.dispose();
        window.removeEventListener('resize', resizeChart);
      };
    }
    return undefined;
  };

  useEffect(() => {
    initializeChart();
  }, [data, theme.palette.grey, colors]);
  return (
    <div style={{ width: '100%', height: renderBottomText ? '340px' : '181px', direction: 'rtl' }}>
      {!data || data?.length === 0 ? (
        <NoData type="pie" isLoading={isLoading} />
      ) : (
        <div
          ref={chartContainerRef}
          className="mainPieChart"
          style={{ width: '100%', height: renderBottomText ? '350px' : '200px', direction: 'rtl' }}
        ></div>
      )}
    </div>
  );
};

export default PieChart;
