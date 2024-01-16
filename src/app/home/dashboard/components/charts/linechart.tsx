"use client";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, 
  LinearScale, 
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const driverProfit = [
  { month: "January", profit: 100 },
  { month: "February", profit: 150 },
  { month: "March", profit: 200 },
  { month: "April", profit: 120 },
  { month: "May", profit: 180 },
  { month: "June", profit: 250 },
];

function LineChart() {
  const data = {
    labels: driverProfit.map((data) => data.month),
    datasets: [
      {
        label: "Profits",
        data: driverProfit.map((data) => data.profit),
        borderColor: "#ea580c",
        borderWidth: 3,
        pointBorderColor: "#ea580c",
        pointBorderWidth: 5,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: { chart: { ctx: any; }; }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#FED7AA");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          
        },
        title: {
          display: true,
          text: "Profit",
          font: {
            size: 16,
          },
        },
        min: 50,
      },
      x: {
        ticks: {
          
        },
        title: {
          display: true,
          text: "Month",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
      <div
        style={{
          width: "560px",
        }}
      >
        <Line data={data} options={options}></Line>
      </div>
  );
}

export default LineChart;
