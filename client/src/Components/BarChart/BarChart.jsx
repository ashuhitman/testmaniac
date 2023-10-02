import React from "react";

import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
export default BarChart;
