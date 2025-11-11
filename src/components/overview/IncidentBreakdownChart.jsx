import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './IncidentBreakdownChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncidentBreakdownChart = ({ data, title, label }) => {
  const chartData = {
    labels: data.map(d => d.severity || d.status),
    datasets: [
      {
        label: label,
        data: data.map(d => d.count),
        backgroundColor: 'rgba(231, 76, 60, 0.6)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
  };

  return <div className="chart-container"><Bar options={options} data={chartData} /></div>;
};

export default IncidentBreakdownChart;