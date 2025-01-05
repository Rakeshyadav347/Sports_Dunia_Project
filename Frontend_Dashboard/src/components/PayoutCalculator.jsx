import React, { useState, useEffect } from 'react';
import { exportToPDF, exportToCSV } from '../utils/export';

function PayoutCalculator({ articles }) {
  const [payoutRate, setPayoutRate] = useState(5); // Default payout rate per article
  const [totalPayout, setTotalPayout] = useState(0);

  useEffect(() => {
    const savedRate = localStorage.getItem('payoutRate');
    if (savedRate) {
      setPayoutRate(Number(savedRate));
    }
  }, []);

  useEffect(() => {
    const total = articles.length * payoutRate;
    setTotalPayout(total);
  }, [articles, payoutRate]);

  const handleRateChange = (e) => {
    const newRate = Number(e.target.value);
    setPayoutRate(newRate);
    localStorage.setItem('payoutRate', newRate);
  };

  const exportData = articles.map((article) => ({
    title: article.title || 'N/A',
    author: article.author || 'N/A',
    payout: payoutRate,
  }));

  return (
    <div className="card p-3">
      <h2 className="mb-3">Payout Calculator</h2>
      <div className="mb-3">
        <label htmlFor="payoutRate" className="form-label">
          Payout Per Article:
        </label>
        <input
          id="payoutRate"
          type="number"
          className="form-control"
          value={payoutRate}
          onChange={handleRateChange}
        />
      </div>
      <div className="mb-3">
        <h5>Total Articles: {articles.length}</h5>
        <h5>Total Payout: ${totalPayout.toFixed(2)}</h5>
      </div>
      <div className="d-flex gap-2">
        <button
          onClick={() => exportToPDF(exportData, 'payout_report.pdf')}
          className="btn btn-danger"
        >
          Export as PDF
        </button>
        <button
          onClick={() => exportToCSV(exportData, 'payout_report.csv')}
          className="btn btn-success"
        >
          Export as CSV
        </button>
      </div>
    </div>
  );
}

export default PayoutCalculator;
