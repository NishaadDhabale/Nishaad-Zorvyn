import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { getCategorySpending, formatCurrency } from '../../utils/logic';

export const CategoryOverview = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // 1. Get the sorted category data
  const data = useMemo(() => getCategorySpending(transactions), [transactions]);

  // 2. Calculate the grand total of all expenses to find the percentages
  const totalSpend = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  return (
    <div className="bg-white dark:bg-[#1A1A1E] p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="font-semibold text-xl text-gray-900 dark:text-white">Aggregated Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your top spending categories</p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-gray-500 text-sm">
          No spending data available
        </div>
      ) : (
        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide">
          {data.slice(0, 7).map((item, idx) => {
            const pct = totalSpend > 0 ? (item.value / totalSpend) * 100 : 0;

            return (
              <div key={item.name} className="group cursor-default">
                {/* Text Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-gray-400">
                      {pct.toFixed(1)}%
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white w-20 text-right">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div className="h-2.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800/80 relative">
                  {/* Animated Fill */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.1, // Stagger effect
                      ease: "easeOut"
                    }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: item.fill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};