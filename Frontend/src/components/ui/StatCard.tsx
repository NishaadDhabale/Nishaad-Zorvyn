import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  amount: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
  highlight?: boolean;
}

export const StatCard = ({ title, amount, trend, isPositive, icon, highlight = false }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-5 rounded-3xl flex flex-col justify-between ${
        highlight
          ? 'bg-gradient-to-br from-[#FF6B3D] to-[#FF4B1A] text-white shadow-lg shadow-orange-500/30'
          : 'bg-white dark:bg-[#1A1A1E] text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`font-medium ${highlight ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'}`}>
          {title}
        </span>
        <div className={`p-2 rounded-full ${highlight ? 'bg-white/20 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-2">{amount}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-2 py-0.5 rounded-md font-medium text-xs ${
            highlight
              ? 'bg-white/20 text-white'
              : isPositive
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
          }`}>
            {isPositive ? '↑' : '↓'} {trend.replace(/[+-]/, '')}
          </span>
          <span className={highlight ? 'text-orange-100 text-xs' : 'text-gray-400 text-xs'}>This month</span>
        </div>
      </div>
    </motion.div>
  );
};