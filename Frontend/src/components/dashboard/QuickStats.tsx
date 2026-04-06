import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Lock, Database, Briefcase, TrendingUp, TrendingDown } from 'lucide-react';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { calculateQuickStats } from '../../utils/logic';

// Helper to map titles to specific icons
const ICON_MAP: Record<string, React.ReactNode> = {
  "Total Balance": <Wallet size={18} />,
  "Total Spending This Month": <Lock size={18} />,
  "Total Incomings This Month": <Database size={18} />,
  "Net Revenue This Month": <Briefcase size={18} />,
};

export const QuickStats = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // 1. Get real values and trends from logic.ts
  const stats = useMemo(() => calculateQuickStats(transactions), [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className={`p-5 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
            stat.highlight
              ? 'bg-gradient-to-br from-[#FF6B3D] to-[#FF4B1A] text-white shadow-xl shadow-orange-500/20 border-none'
              : 'bg-white dark:bg-[#1A1A1E] text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500/30'
          }`}
        >
          {/* Header: Title and Icon */}
          <div className="flex justify-between items-start mb-4">
            <span className={`text-sm font-medium ${
              stat.highlight ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {stat.title}
            </span>
            <div className={`p-2.5 rounded-2xl ${
              stat.highlight
                ? 'bg-white/20 text-white backdrop-blur-md'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-400'
            }`}>
              {ICON_MAP[stat.title] || <Database size={18} />}
            </div>
          </div>

          {/* Body: Amount and Trend */}
          <div>
            <h3 className="text-2xl xl:text-3xl font-bold tracking-tight mb-2">
              {stat.amount}
            </h3>

            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-[10px] ${
                stat.highlight
                  ? 'bg-white/20 text-white'
                  : stat.isPositive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
              }`}>
                {stat.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stat.trend.replace(/[+-]/, '')}
              </span>

              <span className={`text-[10px] font-medium ${
                stat.highlight ? 'text-orange-100/80' : 'text-gray-400'
              }`}>
                vs last month
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};