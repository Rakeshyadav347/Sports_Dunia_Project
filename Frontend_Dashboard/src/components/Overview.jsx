import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Overview({ articlesByCategory }) {
  const categories = Object.keys(articlesByCategory);
  const articleCounts = categories.map((category) => articlesByCategory[category].length);

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: articleCounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Number of Articles',
        data: articleCounts,
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="card p-3 mb-4">
      <h2 className="mb-4">Dashboard Overview</h2>
      <div className="row">
        <div className="col-md-6">
          <h5 className="text-center">Articles by Category (Pie Chart)</h5>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2, // Adjust graph size
            }}
          />
        </div>
        <div className="col-md-6">
          <h5 className="text-center">Articles by Category (Bar Chart)</h5>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 2, // Adjust graph size
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
