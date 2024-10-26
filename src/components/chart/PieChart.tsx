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
  colors?: string[];
}

const PieChart: FC<PieChartProps> = ({
  data = [],
  startIndex,
  renderBottomText = false,
  isLoading,
  colors = [],
}) => {
  const theme = useTheme();
  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);

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
      chartInstanceRef.current = chartInstance;

      const option = {
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
          data: legendData.map((item) => ({
            name: item.name,
            value: item.value,
          })),
          formatter: (name: string) => {
            const item = legendData.find((i) => i.name === name);
            return item ? `${item.name} (${item.value})` : name;
          },
          textStyle: {
            fontFamily: 'vazir',
            color: theme.palette.grey[900],
            fontSize: renderBottomText ? 14 : 16,
            lineHeight: renderBottomText ? 15 : 20,
          },
        },
        series: [
          {
            name: `اطلاعات :`,
            type: 'pie',
            radius: renderBottomText ? ['40%', '55%'] : ['40%', '65%'],
            center: renderBottomText ? ['50%', '40%'] : ['20%', '50%'],
            padAngle: 0,
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 0,
            },
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
              length: 10,
              length2: 10,
            },
            data: chartDataWithPercentage,
            color: colors.length
              ? colors
              : [
                  theme.palette.info.dark,
                  theme.palette.warning.light,
                  theme.palette.error.main,
                  theme.palette.info.main,
                  theme.palette.grey[700],
                ],
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
    }
  };

  useEffect(() => {
    initializeChart();

    const resizeObserver = new ResizeObserver(() => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }
    };
  }, [data, theme.palette.grey, colors, renderBottomText]);

  return (
    <div style={{ width: '100%', height: renderBottomText ? '340px' : '181px', direction: 'rtl' }}>
      {!data || data.length === 0 ? (
        <NoData type="pie" isLoading={isLoading} />
      ) : (
        <div
          ref={chartContainerRef}
          style={{ width: '100%', height: renderBottomText ? '350px' : '230px', direction: 'rtl' }}
        ></div>
      )}
    </div>
  );
};

export default PieChart;
