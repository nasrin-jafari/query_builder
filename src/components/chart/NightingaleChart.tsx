import React, { FC, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ChartDataItem } from './type';
import NoData from '@/utils/NoData';

interface NightingaleChartProps {
  data: ChartDataItem[]; // داده‌های ورودی از همان ساختار قبلی
  startIndex?: number;
  renderBottomText?: boolean;
  isLoading?: boolean;
  colors?: string[]; // استفاده از رنگ‌ها در صورت نیاز
}

const NightingaleChart: FC<NightingaleChartProps> = ({
  data = [],
  startIndex,
  renderBottomText = false,
  isLoading,
  colors = [], // استفاده از آرایه‌ی رنگ‌ها
}) => {
  const theme = useTheme();
  const router = useRouter();
  const nightingaleChartRef = useRef<HTMLDivElement>(null);

  // داده‌های نمودار به همراه درصد محاسبه شده
  const chartDataWithPercentage = data.map((item) => ({
    ...item,
    name: item.fa ? item.fa : item.en, // استفاده از fa یا en به عنوان نام
    value: item.value !== undefined ? item.value : 0, // استفاده از value
  }));

  // داده‌های legend
  const legendData =
    startIndex !== undefined
      ? data.slice(startIndex, startIndex + 4).map((item) => ({
          name: item.fa ? item.fa : item.en,
          value: item.value,
        }))
      : data.map((item) => ({
          name: item.fa ? item.fa : item.en,
          value: item.value,
        }));

  // تابع برای مقداردهی اولیه نمودار
  const initializeChart = () => {
    const chartDom = nightingaleChartRef.current;
    if (chartDom) {
      const chartInstance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

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
          top: renderBottomText ? 'bottom' : 'middle',
          data: legendData.map((item) => item.name),
          formatter: (name: string) => {
            const item = legendData.find((i) => i.name === name);
            return item ? `${item.name} (${item.value})` : name;
          },
          textStyle: {
            fontFamily: 'vazir',
            color: theme.palette.grey[900],
            fontSize: 16,
            lineHeight: 15,
          },
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: ['55%', '85%'],
            center: ['20%', '55%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 0,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            data: chartDataWithPercentage,
            color: colors.length ? colors : undefined,
            animation: true,
            animationDuration: 500,
            animationEasing: 'quadraticIn',
          },
        ],
      };

      // افزودن قابلیت کلیک برای مسیریابی
      chartInstance.on('click', (params: any) => {
        const clickedItem = data.find((item) => (item.fa ? item.fa : item.en) === params.name);
        if (clickedItem?.redirectTo) {
          router.push(clickedItem.redirectTo); // مسیریابی به URL مشخص شده
        }
      });

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
    return undefined;
  };

  useEffect(() => {
    initializeChart();
  }, [data, theme.palette.grey, colors]);

  return (
    <div style={{ width: '100%', height: '181px', direction: 'rtl' }}>
      {!data || data?.length === 0 ? (
        <NoData type="pie" isLoading={isLoading} />
      ) : (
        <div ref={nightingaleChartRef} style={{ width: '100%', height: '100%' }}></div>
      )}
    </div>
  );
};

export default NightingaleChart;
