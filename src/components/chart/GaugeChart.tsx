import NoData from '@/utils/NoData';
import { useMediaQuery, useTheme } from '@mui/material';
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

interface GaugeChartProps {
  data: string;
  name: string;
  color?: string;
  isLoading: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ data, name, isLoading, color }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const initializeChart = (): any => {
    const chartDom = chartContainerRef.current;
    if (chartDom) {
      const chartInstance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

      const value = data ? parseFloat(data) / 100 : 0;

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
            splitNumber: 1, // فقط مقدارهای 0 و 100 نشان داده می‌شوند
            itemStyle: {
              color: color ? color : theme.palette.primary.main, // رنگ قرمز
              shadowColor: color ? color : theme.palette.primary.light,
            },
            axisLine: {
              lineStyle: {
                width: isXs ? 9 : 10,
                color: [
                  [value, color ? color : theme.palette.primary.main], // از 0 تا مقدار داده‌شده قرمز
                  [1, '#d3d3d3'], // از مقدار داده‌شده تا 100 خاکستری
                ],
              },
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              // length: '75%', // بازگرداندن طول فلش به حالت قبلی
              width: isXs ? 8 : 10, // تنظیم عرض فلش بر اساس سایز صفحه
              itemStyle: {
                color: 'auto',
                borderCap: 'round', // گردش کردن نوک فلش
              },
            },
            axisTick: {
              show: false, // حذف تیک‌های اضافی
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
              distance: 20,
              formatter: function (value: number) {
                if (value === 0) {
                  return '0';
                } else if (value === 1) {
                  return '100';
                }
                return '';
              },
            },
            title: {
              show: false, // حذف عنوان
            },
            detail: {
              fontSize: isXs ? 20 : 30,
              offsetCenter: [0, '-20%'], // مرکزیت مقدار در باکس
              valueAnimation: true,
              formatter: function (value: number) {
                return Math.round(value * 100) + '';
              },
              width: '100%', // اندازه کل باکس
              height: '100%',
              color: 'inherit',
            },
            data: [
              {
                value: value,
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
        height: isXs ? '100px' : '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data ? (
        <div
          ref={chartContainerRef}
          style={{
            width: '100%', // عرض کامل کانتینر
            height: isXs ? '20vh' : '40vh', // ارتفاع با مقیاس اصلی
            maxWidth: '400px', // حداکثر عرض
            maxHeight: '300px', // حداکثر ارتفاع
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'scale(0.7)', // کوچک کردن با حفظ اسکیل
            transformOrigin: 'center', // مرکز مقیاس‌بندی
          }}
        />
      ) : (
        <NoData type="speed" isLoading={isLoading} />
      )}
    </div>
  );
};

export default GaugeChart;
