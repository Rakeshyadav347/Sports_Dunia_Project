import jsPDF from 'jspdf';
import { unparse } from 'papaparse';

export const exportToPDF = (data, filename = 'report.pdf') => {
  const doc = new jsPDF();
  doc.text('Payout Report', 10, 10);

  let y = 20;
  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.title || 'N/A'} - $${item.payout || 'N/A'}`, 10, y);
    y += 10;
  });

  doc.save(filename);
};

export const exportToCSV = (data, filename = 'report.csv') => {
  const csv = unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
