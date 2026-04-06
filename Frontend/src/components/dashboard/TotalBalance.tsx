import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { getContinuousData } from '../../utils/logic';

export const TotalBalance = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Calculate every individual point
  const chartData = useMemo(() => getContinuousData(transactions), [transactions]);

  return (
    <div className="w-full h-[380px] bg-white dark:bg-[#1A1A1E] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Income vs Expenses</h3>
          <p className="text-xs text-gray-400">Statistics</p>
        </div>
        {/* ... Legend (Income/Expense indicators) ... */}
      </div>

      <ResponsiveContainer width="80%" height="80%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B3D" />
              <stop offset="100%" stopColor="#FF4B1A" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.05)" />

          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            minTickGap={30} // Prevents labels from overlapping with 40+ points
          />

          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-[#1A1A1E] p-3 rounded-xl border border-gray-800 shadow-2xl">
                    <p className="text-[10px] text-gray-500 mb-1">{data.fullDate}</p>
                    <p className="text-xs font-bold text-white mb-2">{data.name}</p>
                    <div className="flex flex-col gap-1">
                      {data.income && <p className="text-emerald-400 text-xs">Income: +${data.income}</p>}
                      {data.expenses && <p className="text-rose-400 text-xs">Expense: -${data.expenses}</p>}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

{/* --- Income Line (Clean & Glowing) --- */}
<Line
  type="monotone"
  dataKey="income"
  stroke="url(#incomeGradient)"
  strokeWidth={3}
  dot={false} // 👈 This removes the permanent circles
  activeDot={{
    r: 6,
    fill: '#FF6B3D',
    strokeWidth: 0,
    filter: "url(#glow)" // The dot glows only when you hover!
  }}
  filter="url(#glow)"
  connectNulls={true}
/>

{/* --- Expenses Line (Clean & Minimal) --- */}
<Line
  type="monotone"
  dataKey="expenses"
  className="stroke-black dark:stroke-white"
  strokeWidth={3}
  dot={false} // 👈 This removes the permanent circles
  activeDot={{
    r: 6,
    fill: 'currentColor',
    strokeWidth: 0
  }}
  filter="url(#glow)"
  connectNulls={true}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};