import { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { getCategorySpending, formatCurrency } from '../../utils/logic';

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1A1A1E] p-4 rounded-xl shadow-2xl border border-gray-800 min-w-[150px] relative z-50">
        <p className="text-sm font-semibold text-gray-400 mb-1">{data.name}</p>
        <p className="text-lg font-bold" style={{ color: data.fill }}>
          {formatCurrency(data.value)}
        </p>
      </div>
    );
  }
  return null;
}

export const CardsSection = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Get processed data from logic.ts
  const data = useMemo(() => getCategorySpending(transactions), [transactions]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Categorical Split</h3>
        <p className="text-xs text-gray-500">All-time spending by category</p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-gray-500 text-sm">
          No spending data available
        </div>
      ) : (
        <>
          {/* Chart Area */}
          <div className="relative flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                      className="transition-opacity duration-200 outline-none cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={false} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Total</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 mt-6">
            {data.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center gap-2 transition-opacity duration-200 cursor-pointer"
                style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.4 }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: entry.fill }} />
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate w-full" title={entry.name}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};