import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

type DoughnutChartProps = {
  p1: number;
  p2: number;
  p3: number;
  width: number;
  height: number;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  p1,
  p2,
  p3,
  width,
  height,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'doughnut', number[], string> | null>(
    null,
  );

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [
              {
                label: 'Porcentajes',
                data: [p1, p2, p3],
                backgroundColor: ['#9F2180', '#CBA3BD', '#E4E6EC'],
                borderColor: ['#9F2180', '#CBA3BD', '#E4E6EC'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: false,
            cutout: '90%',
          },
        } as ChartConfiguration<'doughnut', number[], string>);
      }
    }
  }, [p1, p2, p3]);

  return <canvas ref={chartRef} width={width} height={height} />;
};

export default DoughnutChart;
