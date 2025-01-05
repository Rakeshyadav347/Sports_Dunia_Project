import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement, 
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  TimeScale,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';


ChartJS.register(
  BarElement,
  LineElement,
  PointElement, 
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  TimeScale
);

function Analytics({ articlesByCategory }) {
  
  const authorData = {};
  Object.values(articlesByCategory).flat().forEach((article) => {
    const author = article.author || 'Unknown';
    authorData[author] = (authorData[author] || 0) + 1;
  });

  const authors = Object.keys(authorData);
  const articleCountsByAuthor = Object.values(authorData);

  const authorChartData = {
    labels: authors,
    datasets: [
      {
        label: 'Number of Articles',
        data: articleCountsByAuthor,
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  
  const timeData = {};
  Object.values(articlesByCategory).flat().forEach((article) => {
    const date = new Date(article.publishedAt).toISOString().split('T')[0]; 
    timeData[date] = (timeData[date] || 0) + 1;
  });

  const sortedDates = Object.keys(timeData).sort(); 
  const articleCountsByDate = sortedDates.map((date) => timeData[date]);

  const timeChartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Articles Published',
        data: articleCountsByDate,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="card p-3 mb-4">
      <h2 className="mb-4">News Analytics</h2>

      {/* Articles by Author (Bar Chart) */}
      <div className="mb-4">
        <h5 className="text-center">Articles by Author</h5>
        <Bar
          data={authorChartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: true, position: 'top' },
            },
          }}
        />
      </div>

      {/* Articles Over Time (Line Chart) */}
      <div>
        <h5 className="text-center">Articles Over Time</h5>
        <Line
          data={timeChartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              x: {
                type: 'time', 
                time: { unit: 'day' }, 
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Analytics;
