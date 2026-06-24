import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Clean up text for CSV encoding (escapes double quotes and wraps in quotes)
 */
const escapeCSV = (val) => {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
};

/**
 * Exports data to CSV/Excel format and triggers download.
 */
export function exportToExcel(bazarList, calculations, monthName = 'June 2026') {
  const { totalPool, targetShare, balance, baseContributions, vaiaBazarSpent, reazulBazarSpent } = calculations;

  // Settle math
  let settlementText = 'All Accounts Settled';
  if (balance.Vaia > 0 && balance.Reazul < 0) {
    settlementText = `Reazul owes Vaia ৳${Math.abs(balance.Reazul).toFixed(2)}`;
  } else if (balance.Reazul > 0 && balance.Vaia < 0) {
    settlementText = `Vaia owes Reazul ৳${Math.abs(balance.Vaia).toFixed(2)}`;
  }

  // Construct CSV Rows
  const rows = [];

  // Report Header
  rows.push(['Shared Expense & Settlement Hub Report']);
  rows.push([`Month: ${monthName}`]);
  rows.push([`Generated: ${new Date().toLocaleString()}`]);
  rows.push(['Split Weight: Roommate A (Vaia) = 58.33%, Roommate B (Reazul) = 41.67%']);
  rows.push([]);

  // Calculations Summary Section
  rows.push(['Settlement Summary Ledger']);
  rows.push(['Name', 'Base Cash Contributed', 'Out-of-Pocket Bazar Spent', 'Total Paid Contribution', 'Target Share (58.33% / 41.67%)', 'Outstanding Dues / Overpaid']);
  
  rows.push([
    'Vaia',
    baseContributions.Vaia.toFixed(2),
    vaiaBazarSpent.toFixed(2),
    (baseContributions.Vaia + vaiaBazarSpent).toFixed(2),
    targetShare.Vaia.toFixed(2),
    balance.Vaia >= 0 ? `+৳${balance.Vaia.toFixed(2)} (Overpaid)` : `-৳${Math.abs(balance.Vaia).toFixed(2)} (Owes)`
  ]);
  
  rows.push([
    'Reazul',
    baseContributions.Reazul.toFixed(2),
    reazulBazarSpent.toFixed(2),
    (baseContributions.Reazul + reazulBazarSpent).toFixed(2),
    targetShare.Reazul.toFixed(2),
    balance.Reazul >= 0 ? `+৳${balance.Reazul.toFixed(2)} (Overpaid)` : `-৳${Math.abs(balance.Reazul).toFixed(2)} (Owes)`
  ]);

  rows.push(['Total Pool', '', '', totalPool.toFixed(2), totalPool.toFixed(2), '']);
  rows.push([]);
  rows.push(['Settlement Instruction:', settlementText]);
  rows.push([]);

  // Grocery Bazar Log Section
  rows.push(['Itemized Bazar Grocery Log']);
  rows.push(['Date', 'Buyer Name', 'Cost (৳)', 'Note / Comments']);

  // Sort Bazar items by date descending for report
  const sortedBazar = [...bazarList].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  sortedBazar.forEach(item => {
    rows.push([
      item.date,
      item.buyer,
      item.cost.toFixed(2),
      item.note || ''
    ]);
  });

  // Convert array to CSV string
  const csvString = rows
    .map(row => row.map(cell => escapeCSV(cell)).join(','))
    .join('\r\n');

  // Trigger file download
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `monthly_expense_report_${monthName.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports data to PDF document and triggers download.
 */
export function exportToPDF(bazarList, calculations, monthName = 'June 2026') {
  const { totalPool, targetShare, balance, baseContributions, vaiaBazarSpent, reazulBazarSpent } = calculations;

  // Initialize jsPDF document (A4 size)
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Set fonts and primary color theme (Indigo: rgb(79, 70, 229), Slate: rgb(15, 23, 42))
  const primaryColor = [79, 70, 229];
  const secondaryColor = [16, 185, 129]; // Emerald
  const textColor = [15, 23, 42];
  const lightTextColor = [100, 116, 139];

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Expense & Settlement Report', 14, 20);

  // Subtitle / Date details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text(`Month: ${monthName}  |  Generated on: ${new Date().toLocaleString()}`, 14, 26);
  doc.text('House Ratio Split Config: Vaia (58.33%)  |  Reazul (41.67%)', 14, 31);

  // Line separator
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 34, 196, 34);

  // --- Summary Calculations Cards (Drawing side-by-side grids) ---
  doc.setFillColor(248, 250, 252); // Light background grey
  doc.rect(14, 38, 56, 22, 'F');
  doc.rect(75, 38, 56, 22, 'F');
  doc.rect(136, 38, 60, 22, 'F');

  // Pool Card text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text('TOTAL CONTRIBUTION POOL', 17, 43);
  doc.setFontSize(14);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`TK ${totalPool.toLocaleString()}`, 17, 52);

  // Vaia Card text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('VAIA TOTAL CONTRIBUTION', 78, 43);
  doc.setFontSize(14);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`TK ${(baseContributions.Vaia + vaiaBazarSpent).toLocaleString()}`, 78, 52);

  // Reazul Card text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('REAZUL TOTAL CONTRIBUTION', 139, 43);
  doc.setFontSize(14);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`TK ${(baseContributions.Reazul + reazulBazarSpent).toLocaleString()}`, 139, 52);

  // --- Flow of Funds Settlement Instruction Card ---
  let settlementText = 'No payment transactions needed. All accounts are fully settled.';
  let isSettled = true;
  if (balance.Vaia > 0 && balance.Reazul < 0) {
    settlementText = `Reazul owes Vaia TK ${Math.abs(balance.Reazul).toFixed(2)}. Please transfer this amount to settle balances.`;
    isSettled = false;
  } else if (balance.Reazul > 0 && balance.Vaia < 0) {
    settlementText = `Vaia owes Reazul TK ${Math.abs(balance.Vaia).toFixed(2)}. Please transfer this amount to settle balances.`;
    isSettled = false;
  }

  // Draw settlement instruction box
  if (isSettled) {
    doc.setFillColor(236, 253, 245); // Emerald-50 light green
    doc.setDrawColor(16, 185, 129);  // Emerald border
  } else {
    doc.setFillColor(239, 246, 255); // Indigo-50 light blue
    doc.setDrawColor(79, 70, 229);   // Indigo border
  }
  doc.rect(14, 65, 182, 14, 'DF');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Flow of Funds Settling Instruction:', 18, 71);
  doc.setFont('helvetica', 'normal');
  doc.text(settlementText, 70, 71);

  // --- Section: Settlement Summary Ledger Table ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Monthly Settlement Ledger Summary', 14, 88);

  const ledgerHeaders = [['Roommate', 'Base Cash', 'Bazar Spent', 'Total Paid', 'Target Share', 'Outstanding Dues']];
  const ledgerRows = [
    [
      'Vaia (58.33%)',
      `TK ${baseContributions.Vaia.toLocaleString()}`,
      `TK ${vaiaBazarSpent.toLocaleString()}`,
      `TK ${(baseContributions.Vaia + vaiaBazarSpent).toLocaleString()}`,
      `TK ${targetShare.Vaia.toFixed(2)}`,
      balance.Vaia >= 0 ? `+TK ${balance.Vaia.toFixed(2)} (Refund)` : `-TK ${Math.abs(balance.Vaia).toFixed(2)} (Owes)`
    ],
    [
      'Reazul (41.67%)',
      `TK ${baseContributions.Reazul.toLocaleString()}`,
      `TK ${reazulBazarSpent.toLocaleString()}`,
      `TK ${(baseContributions.Reazul + reazulBazarSpent).toLocaleString()}`,
      `TK ${targetShare.Reazul.toFixed(2)}`,
      balance.Reazul >= 0 ? `+TK ${balance.Reazul.toFixed(2)} (Refund)` : `-TK ${Math.abs(balance.Reazul).toFixed(2)} (Owes)`
    ]
  ];

  autoTable(doc, {
    startY: 92,
    head: ledgerHeaders,
    body: ledgerRows,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, halign: 'left', fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: textColor, fontSize: 9 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 14, right: 14 }
  });

  // --- Section: Itemized Grocery Bazar Log ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Itemized daily Bazar Grocery Purchases', 14, doc.lastAutoTable.finalY + 12);

  const logHeaders = [['Date', 'Buyer Name', 'Cost (TK)', 'Details / Comments']];
  
  // Sort Bazar items by date descending for report
  const sortedBazar = [...bazarList].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const logRows = sortedBazar.map(item => [
    item.date,
    item.buyer,
    `TK ${item.cost.toFixed(2)}`,
    item.note || '-'
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 16,
    head: logHeaders,
    body: logRows,
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42], halign: 'left', fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: textColor, fontSize: 8.5 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 25 },
      2: { cellWidth: 25 },
      3: { cellWidth: 'auto' }
    },
    margin: { left: 14, right: 14, bottom: 20 },
    didDrawPage: (data) => {
      // Draw Footer
      const totalPages = doc.internal.getNumberOfPages();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
      
      // Right-aligned page numbers
      const pageStr = `Page ${data.pageNumber} of ${totalPages}`;
      doc.text(pageStr, 196 - doc.getTextWidth(pageStr), 285);
      doc.text('Generated by Shared Expense & Settlement Hub', 14, 285);
    }
  });

  // Save the PDF document
  doc.save(`monthly_expense_report_${monthName.replace(/\s+/g, '_')}.pdf`);
}
