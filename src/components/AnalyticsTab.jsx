import React, { useState } from 'react';
import { Calendar, BarChart3, TrendingUp, PieChart, ShoppingBag } from 'lucide-react';

export default function AnalyticsTab({ bazarList, onBarClick }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  // Generate all 30 days of June 2026
  const getJuneDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const dd = String(i).padStart(2, '0');
      days.push(`2026-06-${dd}`);
    }
    return days;
  };

  const days = getJuneDays();

  // Aggregate spending by day and by buyer
  const dailySpending = days.map((date) => {
    const dayItems = bazarList.filter((item) => item.date === date);
    const reza = dayItems.filter((i) => i.buyer === 'Reza').reduce((sum, i) => sum + i.cost, 0);
    const reaz = dayItems.filter((i) => i.buyer === 'Reaz').reduce((sum, i) => sum + i.cost, 0);
    const shared = dayItems.filter((i) => i.buyer === 'Shared').reduce((sum, i) => sum + i.cost, 0);
    const total = reza + reaz + shared;

    return {
      date,
      dayNum: parseInt(date.split('-')[2]),
      reza,
      reaz,
      shared,
      total,
      hasRecords: dayItems.length > 0,
    };
  });

  // Calculate metrics
  const totalBazarCost = bazarList.reduce((sum, i) => sum + i.cost, 0);
  const averageCostPerDay = totalBazarCost / 30;

  const recordedDaysCount = dailySpending.filter((d) => d.hasRecords).length;
  const percentageDaysRecorded = (recordedDaysCount / 30) * 100;

  // Roommate totals
  const totalRezaSpent = bazarList.filter((i) => i.buyer === 'Reza').reduce((sum, i) => sum + i.cost, 0);
  const totalReazSpent = bazarList.filter((i) => i.buyer === 'Reaz').reduce((sum, i) => sum + i.cost, 0);
  const totalSharedSpent = bazarList.filter((i) => i.buyer === 'Shared').reduce((sum, i) => sum + i.cost, 0);

  // Chart layout config
  const maxDayTotal = Math.max(...dailySpending.map((d) => d.total), 1000); // minimum scale limit 1000
  const chartHeight = 200;
  const paddingBottom = 25;
  const paddingTop = 10;
  const chartInnerHeight = chartHeight - paddingBottom - paddingTop;

  return (
    <div className="space-y-6">
      {/* Frequency & Spending Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Monthly Spent</span>
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white">৳ {totalBazarCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-[10px] text-slate-500 mt-1">Sum of all bazar items bought</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Average / Day</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">৳ {averageCostPerDay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-[10px] text-slate-500 mt-1">Across 30 days of the month</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Days Recorded</span>
            <Calendar className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white">{recordedDaysCount} Days</p>
          <p className="text-[10px] text-slate-500 mt-1">{percentageDaysRecorded.toFixed(1)}% of the month logged</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between mb-3 text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Spender (Bazar)</span>
            <BarChart3 className="w-5 h-5 text-fuchsia-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {totalRezaSpent >= totalReazSpent ? 'Reza' : 'Reaz'}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Reza: ৳ {totalRezaSpent.toLocaleString()} | Reaz: ৳ {totalReazSpent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* SVG Interactive Chart Panel */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 shadow-lg relative">
        <h3 className="text-base font-bold text-white mb-1">June 2026 daily spending trend</h3>
        <p className="text-xs text-slate-400 mb-6">
          Hover for breakdown. Click any bar to navigate to the Bazar Gallery for that date.
        </p>

        {/* Legend */}
        <div className="flex items-center space-x-4 mb-4 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-md bg-indigo-500 block" />
            <span className="text-slate-300">Reza</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500 block" />
            <span className="text-slate-300">Reaz</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500 block" />
            <span className="text-slate-300">Shared</span>
          </div>
        </div>

        {/* SVG Container */}
        <div className="relative w-full overflow-x-auto pb-2">
          <div className="min-w-[640px]">
            <svg 
              viewBox={`0 0 720 ${chartHeight}`} 
              className="w-full h-auto select-none"
            >
              {/* Y Axis Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + chartInnerHeight * (1 - ratio);
                const labelVal = Math.round(maxDayTotal * ratio);
                return (
                  <g key={`grid-${i}`}>
                    <line 
                      x1="35" 
                      y1={y} 
                      x2="710" 
                      y2={y} 
                      stroke="#1e293b" 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                    />
                    <text 
                      x="0" 
                      y={y + 4} 
                      fill="#64748b" 
                      fontSize="9" 
                      fontWeight="600"
                    >
                      ৳{labelVal}
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {dailySpending.map((d, index) => {
                const barWidth = 14;
                const gap = 8;
                const x = 40 + index * (barWidth + gap);

                // Math for stacked portions
                const yReza = chartInnerHeight * (d.reza / maxDayTotal);
                const yReaz = chartInnerHeight * (d.reaz / maxDayTotal);
                const yShared = chartInnerHeight * (d.shared / maxDayTotal);
                const yTotal = yReza + yReaz + yShared;

                // Absolute positions
                const startY = chartHeight - paddingBottom;
                const sharedY = startY - yShared;
                const reazY = sharedY - yReaz;
                const rezaY = reazY - yReza;

                const isHovered = hoveredBar === index;

                return (
                  <g 
                    key={`bar-${d.date}`}
                    onClick={() => d.hasRecords && onBarClick(d.date)}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className={`${d.hasRecords ? 'cursor-pointer' : 'opacity-25'}`}
                  >
                    {/* Shared Portion (Base) */}
                    {d.shared > 0 && (
                      <rect
                        x={x}
                        y={sharedY}
                        width={barWidth}
                        height={yShared}
                        fill="#f59e0b"
                        className="transition-all duration-300"
                        opacity={isHovered ? 0.95 : 0.8}
                      />
                    )}

                    {/* Reaz Portion (Middle) */}
                    {d.reaz > 0 && (
                      <rect
                        x={x}
                        y={reazY}
                        width={barWidth}
                        height={yReaz}
                        fill="#10b981"
                        className="transition-all duration-300"
                        opacity={isHovered ? 0.95 : 0.8}
                      />
                    )}

                    {/* Reza Portion (Top) */}
                    {d.reza > 0 && (
                      <rect
                        x={x}
                        y={rezaY}
                        width={barWidth}
                        height={yReza}
                        fill="#6366f1"
                        className="transition-all duration-300"
                        opacity={isHovered ? 0.95 : 0.8}
                      />
                    )}

                    {/* Interactive hover overlay for whole day */}
                    <rect
                      x={x - 2}
                      y={paddingTop}
                      width={barWidth + 4}
                      height={chartInnerHeight}
                      fill="transparent"
                    />

                    {/* X Axis Labels (Day numbers) */}
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight - 8}
                      fill={isHovered ? '#fff' : '#64748b'}
                      fontSize="9"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {d.dayNum}
                    </text>
                  </g>
                );
              })}

              {/* Bottom Baseline */}
              <line 
                x1="35" 
                y1={chartHeight - paddingBottom} 
                x2="710" 
                y2={chartHeight - paddingBottom} 
                stroke="#334155" 
                strokeWidth="1.5" 
              />
            </svg>
          </div>
        </div>

        {/* Tooltip Overlay */}
        <div className="mt-4 min-h-[50px] p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
          {hoveredBar !== null ? (
            <>
              <div>
                <span className="font-bold text-white text-sm">June {dailySpending[hoveredBar].dayNum}, 2026</span>
                <span className="text-slate-400 ml-2">Total Daily Cost:</span>
                <span className="text-indigo-400 font-bold ml-1 text-sm">৳{dailySpending[hoveredBar].total.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <span>Reza: <strong className="text-indigo-400">৳{dailySpending[hoveredBar].reza}</strong></span>
                <span>Reaz: <strong className="text-emerald-400">৳{dailySpending[hoveredBar].reaz}</strong></span>
                <span>Shared: <strong className="text-amber-400">৳{dailySpending[hoveredBar].shared}</strong></span>
              </div>
            </>
          ) : (
            <span className="text-slate-500 italic">Hover over any day bar above to see the granular cost breakdown.</span>
          )}
        </div>
      </div>
    </div>
  );
}
