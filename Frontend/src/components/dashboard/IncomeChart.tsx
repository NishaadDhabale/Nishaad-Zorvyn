import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { getMonthlyBarChartData, formatCurrency } from '../../utils/logic';

export const IncomeChart = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Calculate dynamic data
  const { chartData, yAxisLabels } = useMemo(
    () => getMonthlyBarChartData(transactions),
    [transactions]
  );

  return (
    <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Income vs Expenses</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">View your cash flow over the year</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm mb-4">
        <span className="font-semibold text-gray-900 dark:text-white">Profit and Loss</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            {/* Fixed legend color to match the Orange striped bar */}
            <div className="w-2.5 h-2.5 rounded-sm bg-[#FF5722]"></div>
            <span className="text-gray-500">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-gray-900 dark:bg-white"></div>
            <span className="text-gray-500">Expense</span>
          </div>
        </div>
      </div>

      {/* Custom Bar Chart */}
      <div className="flex-1 relative mt-4 flex items-end justify-between pl-8 border-b border-gray-100 dark:border-gray-800/50 pb-2 min-h-[220px]">

        {/* Dynamic Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-medium text-gray-400 pb-2">
          {yAxisLabels.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="border-b border-dashed border-gray-200 dark:border-gray-800/60 w-full"></div>
          ))}
        </div>

        {/* Bars */}
        <div className="flex justify-between w-full relative z-10 h-full items-end pt-2">
          {chartData.map((data, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 group w-8 relative"
              title={`Income: ${formatCurrency(data.rawIncome)}\nExpense: ${formatCurrency(data.rawExpense)}`} // Native HTML tooltip on hover
            >
              {/* Stacked Bar Container */}
              <div className="w-full flex flex-col justify-end gap-[1px] h-48">

                {/* Profit/Income Bar (Striped Orange) */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.profitPercent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05, type: 'spring', bounce: 0.2 }}
                  className={`w-full relative overflow-hidden bg-[#FF5722] ${data.lossPercent === 0 ? 'rounded-b-md' : ''} ${data.profitPercent > 0 ? 'rounded-t-md' : ''}`}
                >
                  {/* CSS Stripes */}
                  <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#000_4px,#000_8px)]"></div>
                </motion.div>

                {/* Loss/Expense Bar (Solid Black/Dark) */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.lossPercent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 + 0.1, type: 'spring', bounce: 0.2 }}
                  className={`w-full bg-gray-900 dark:bg-white ${data.profitPercent === 0 ? 'rounded-t-md' : ''} ${data.lossPercent > 0 ? 'rounded-b-md' : ''}`}
                ></motion.div>

              </div>
              <span className="text-[10px] font-medium text-gray-400 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};