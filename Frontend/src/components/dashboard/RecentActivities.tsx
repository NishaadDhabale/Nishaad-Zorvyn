import { useState, useMemo } from 'react'; // Added useMemo for performance
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash,
  X,
  Save,
  Code,
  Briefcase,
  Wallet,
  Palette,
  Package,
  Laptop,
  Zap,
  Activity,
  Coffee,
  Car,
  TrendingUp,
  Film,
  Home,
  ShoppingCart,
  Music,
  Globe,
  Utensils,
  Fuel,
  Sparkles,
  Monitor,
  Bitcoin,
  Shield,
  Gift,
  Cloud,
  CloudLightning,
  Gamepad,
  Smartphone,
  Tag,
  PieChart,
  Landmark,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { useShallow } from 'zustand/shallow';
import { useRoleStore } from '../../hooks/useRoleStore';
import { convertToCSV, triggerDownload } from '../../utils/export.ts';

interface RecentActivitiesProps {
  limit?: number;
  isFullPage?: boolean;
}

const ICON_MAP: Record<string, any> = {
  briefcase: Briefcase,
  wallet: Wallet,
  palette: Palette,
  package: Package,
  laptop: Laptop,
  zap: Zap,
  activity: Activity,
  coffee: Coffee,
  car: Car,
  'trending-up': TrendingUp,
  film: Film,
  home: Home,
  'shopping-cart': ShoppingCart,
  music: Music,
  globe: Globe,
  utensils: Utensils,
  fuel: Fuel,
  sparkles: Sparkles,
  monitor: Monitor,
  bitcoin: Bitcoin,
  shield: Shield,
  gift: Gift,
  cloud: Cloud,
  'cloud-lightning': CloudLightning,
  gamepad: Gamepad,
  smartphone: Smartphone,
  tag: Tag,
  'pie-chart': PieChart,
  landmark: Landmark,
  cross: Activity,
  heart: Heart,
};

export const RecentActivities = ({
  limit,
  isFullPage = false,
}: RecentActivitiesProps) => {
  const [editing, setEditing] = useState({
    editingId: '',
    isEditing: false,
    updatedData: {
      date: '',
      amount: 0,
      category: '',
      type: 'income' | 'expense',
      description: '',
      account: '',
      icon: '',
    },
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'income' | 'expense'>(
    'All',
  );

  const { transactions, deleteTransaction, editTransaction } =
    useTransactionStore(
      useShallow((state) => ({
        transactions: state.transactions,
        deleteTransaction: state.deleteTransaction,
        editTransaction: state.editTransaction,
      })),
    );
  const role = useRoleStore((state) => state.role);
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);

  const filteredData = useMemo(() => {
    return transactions
      .filter((item) => {
        const matchesSearch =
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === 'All' || item.type === typeFilter;

        return matchesSearch && matchesType;
      })
      .slice(0, limit || transactions.length); // Apply limit AFTER filtering
  }, [transactions, searchTerm, typeFilter, limit]);

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredData, null, 2);
    triggerDownload(jsonContent, 'transactions.json', 'application/json');
  };

  const handleExportCSV = () => {
    const csvContent = convertToCSV(filteredData);
    triggerDownload(csvContent, 'transactions.csv', 'text/csv;charset=utf-8;');
  };

  return (
    <div
      className={`bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-full shadow-sm ${isFullPage ? 'min-h-[600px]' : ''}`}
    >
      <div className="inline-flex shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <motion.button
          whileHover={{ scale: 1.02, zIndex: 30 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportCSV}
          style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}
          className="relative z-20 px-6 py-2 bg-white dark:bg-[#1A1A1E] text-gray-700 dark:text-gray-300 text-xs font-bold hover:text-emerald-600 border border-gray-200 dark:border-gray-800 rounded-l-2xl pr-10 transition-colors"
        >
          <div className="flex items-center gap-2">Export CSV</div>
        </motion.button>

        {/* --- Right Button: JSON (Trapezoid) --- */}
        <motion.button
          whileHover={{ scale: 1.02, zIndex: 20 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportJSON}
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
          className="relative z-10 -ml-8 px-8 py-2 bg-white dark:bg-[#1A1A1E] text-gray-700 dark:text-gray-300 text-xs font-bold hover:text-blue-600 border border-gray-200 dark:border-gray-800 rounded-r-2xl pl-12 transition-colors border-l-0"
        >
          <div className="flex items-center gap-2">
            <Code size={14} />
            Export JSON
          </div>
        </motion.button>
      </div>
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {isFullPage ? 'All Transactions' : 'Recent Activities'}
        </h3>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:flex-none">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-10 py-2 w-full md:w-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Filter Toggle */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
            <tr>
              {(isFullPage || role === 'Admin') && (
                <th className="p-4 w-12 rounded-l-xl"></th>
              )}
              <th
                className={`p-4 ${!(isFullPage || role === 'Admin') ? 'rounded-l-xl' : ''}`}
              >
                Order ID
              </th>
              <th className="p-4">Description</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>

              {isFullPage && <th className="p-4">Date</th>}
              <th className="p-4 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="relative">
            <AnimatePresence mode="popLayout">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => {
                  const Icon = ICON_MAP[item.icon] || Wallet;
                  return (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      key={item.id + idx}
                      className={`border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors `}
                    >
                      {(isFullPage || role === 'Admin') && (
                        <td className="p-4 w-12"></td>
                      )}
                      <td className="p-4 font-medium text-gray-600 dark:text-gray-300">
                        {item.id}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'}`}
                            >
                              <Icon size={18} />
                            </div>
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {editing.isEditing &&
                            editing.editingId === item.id ? (
                              <input
                                onChange={(e) =>
                                  setEditing({
                                    ...editing,
                                    updatedData: {
                                      ...editing.updatedData,
                                      description: e.target.value,
                                    },
                                  })
                                }
                                value={editing.updatedData.description}
                              />
                            ) : (
                              item.description
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">
    {editing.isEditing && editing.editingId === item.id ? (
      <input
        type="text"
        placeholder="Category"
        onChange={(e) =>
          setEditing({
            ...editing,
            updatedData: { ...editing.updatedData, category: e.target.value },
          })
        }
        value={editing.updatedData.category}
        className="bg-transparent border-b border-gray-300 dark:border-gray-700 outline-none focus:border-orange-500 w-full max-w-[120px]"
      />
    ) : (
      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-medium">
        {item.category || 'Uncategorized'}
      </span>
    )}
  </td>
                      <td className="p-4 font-bold text-gray-900 dark:text-white">
                        {editing.isEditing && editing.editingId === item.id ? (
                          <input
                            type="number"
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                updatedData: {
                                  ...editing.updatedData,
                                  amount: e.target.value,
                                },
                              })
                            }
                            value={editing.updatedData.amount}
                          />
                        ) : (
                          `${formatCurrency(item.amount)}`
                        )}
                      </td>

                      {isFullPage && (
                        <td className="p-4 text-gray-500 whitespace-nowrap">
                          {editing.isEditing &&
                          editing.editingId === item.id ? (
                            <input
                              onChange={(e) =>
                                setEditing({
                                  ...editing,
                                  updatedData: {
                                    ...editing.updatedData,
                                    date: e.target.value,
                                  },
                                })
                              }
                              value={editing.updatedData.date}
                            />
                          ) : (
                            item.date
                          )}
                        </td>
                      )}
                      <td className="p-4 text-right">
                        {isFullPage &&
                        (role === 'Admin' || role === 'Editor') ? (
                          <div className="flex justify-end gap-1">
                            {editing.isEditing &&
                            editing.editingId === item.id ? (
                              <button
                                onClick={() => {
                                  editTransaction(item.id, editing.updatedData);
                                  setEditing({
                                    editingId: '',
                                    isEditing: false,
                                    updatedData: {
                                      id: '',
                                      date: '',
                                      amount: 0,
                                      category: '',
                                      type: 'income',
                                      description: '',
                                      account: '',
                                      icon: '',
                                    },
                                  });
                                }}
                                className="p-2 hover:bg-orange-50 dark:hover:bg-orange-500/10 text-orange-500 rounded-lg transition"
                              >
                                <Save size={16} />
                              </button>
                            ) : (
                              ''
                            )}
                            {editing.isEditing &&
                            editing.editingId === item.id ? (
                              <button
                                onClick={() => deleteTransaction(item.id)}
                                className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 rounded-lg transition"
                              >
                                <Trash size={16} />
                              </button>
                            ) : (
                              ''
                            )}
                            <button
                              onClick={() => {
                                setEditing({
                                  isEditing: !editing.isEditing,
                                  editingId: item.id,
                                  updatedData: {
                                    description: item.description,
                                    amount: item.amount,
                                    date: item.date,
                                    id: item.id,
                                    icon: item.icon,
                                    category: item.category,
                                    account: item.account,
                                    type: item.type,
                                  },
                                });
                              }}
                              className="p-2 hover:bg-orange-50 dark:hover:bg-orange-500/10 text-orange-500 rounded-lg transition"
                            >
                              {!editing.isEditing ? (
                                <Edit2 size={16} />
                              ) : (
                                <X size={16} />
                              )}
                            </button>
                          </div>
                        ) : (
                          <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <MoreHorizontal size={18} />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan={7} className="p-20 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Filter size={40} className="opacity-20" />
                      <p>No transactions found matching your filters.</p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setTypeFilter('All');
                        }}
                        className="text-orange-500 text-sm font-semibold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
