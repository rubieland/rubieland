import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  data: ChartData<'bar', number[], string>;
  options: ChartOptions<'bar'>;
}

const BarChart = ({ data, options }: BarChartProps) => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
