import { useTranslation } from 'react-i18next';
import colors from '@/assets/styles/colors';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface UserCreationChartProps {
  labels: string[];
  data: number[];
}

const UserCreationChart = ({ labels, data }: UserCreationChartProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.charts.users',
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: t('usersCreation.dataLabel'),
        data,
        backgroundColor: colors.primaryLight,
        borderColor: colors.primary,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default UserCreationChart;
