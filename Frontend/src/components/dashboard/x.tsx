import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit2,
  Trash,
  X,
  Save,
  Code,
  // Icons for the mapper
  Briefcase, Wallet, Palette, Package, Laptop, Zap,
  Activity, Coffee, Car, TrendingUp, Film, Home,
  ShoppingCart, Music, Globe, Utensils, Fuel, Sparkles,
  Monitor, Bitcoin, Shield, Gift, Cloud, CloudLightning,
  Gamepad, Smartphone, Tag, PieChart, Landmark, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionStore } from '../../hooks/useTransactionStore';
import { useShallow } from 'zustand/shallow';
import { useRoleStore } from '../../hooks/useRoleStore';
import { convertToCSV, triggerDownload } from '../../utils/export.ts';

// 1. Icon Mapper: Connects JSON strings to Lucide Components
const ICON_MAP: Record<string, any> = {
  briefcase: Briefcase, wallet: Wallet, palette: Palette, package: Package,
  laptop: Laptop, zap: Zap, activity: Activity, coffee: Coffee,
  car: Car, "trending-up": TrendingUp, film: Film, home: Home,
  "shopping-cart": ShoppingCart, music: Music, globe: Globe, utensils: Utensils,
  fuel: Fuel, sparkles: Sparkles, monitor: Monitor, bitcoin: Bitcoin,
  shield: Shield, gift: Gift, cloud: Cloud, "cloud-lightning": CloudLightning,
  gamepad: Gamepad, smartphone: Smartphone, tag: Tag, "pie-chart": PieChart,
  landmark: Landmark, cross: Activity, heart: Heart
};

export const RecentActivities = ({ limit, isFullPage = false }: { limit?: number; isFullPage?: boolean }) => {
  const [editing, setEditing] = useState({
    editingId: '',
    isEditing: false,
    updatedData: {} as any,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'income' | 'expense'>('All');

  const { transactions, deleteTransaction, editTransaction } = useTransactionStore(
    useShallow((state) => ({
      transactions: state.transactions,
      deleteTransaction: state.deleteTransaction,
      editTransaction: state.editTransaction,
    }))
  );
  const role = useRoleStore((state) => state.role);

  // Formatting Helper
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

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
      .slice(0, limit || transactions.length);
  }, [transactions, searchTerm, typeFilter, limit]);

  const handleExportJSON = () => triggerDownload(JSON.stringify(filteredData, null, 2), 'transactions.json', 'application/json');
  const handleExportCSV = () => triggerDownload(convertToCSV(filteredData), 'transactions.csv', 'text/csv;charset=utf-8;');

  return (
    <div className={`bg-white dark:bg-[#1A1A1E] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-full shadow-sm ${isFullPage ? 'min-h-[600px]' : ''}`}>

      {/* --- Header & Search --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {isFullPage ? 'Transaction History' : 'Recent Activities'}
          </h3>
          <div className="flex gap-2">
            <button onClick={handleExportCSV} className="text-[10px] font-bold text-gray-400 hover:text-emerald-500 transition-colors uppercase tracking-wider">Export CSV</button>
            <button onClick={handleExportJSON} className="text-[10px] font-bold text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-wider">Export JSON</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search description or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-10 py-2 w-full md:w-64 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium dark:text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 bg-gray-50/50 dark:bg-gray-900/50 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th className="p-4 rounded-l-xl">ID</th>
              <th className="p-4">Description</th>
              <th className="p-4">Account</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date</th>
              <th className="p-4 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="relative">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, idx) => {
                const Icon = ICON_MAP[item.icon] || Wallet;
                const isEditing = editing.isEditing && editing.editingId === item.id;

                return (
                  <motion.tr
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4 font-mono text-[11px] text-gray-400">{item.id}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex flex-col">
                          {isEditing ? (
                            <input
                              className="bg-transparent border-b border-orange-500 outline-none text-gray-900 dark:text-white font-semibold"
                              value={editing.updatedData.description}
                              onChange={(e) => setEditing({...editing, updatedData: {...editing.updatedData, description: e.target.value}})}
                            />
                          ) : (
                            <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.description}</span>
                          )}
                          <span className="text-[11px] text-gray-400">{item.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-gray-500 dark:text-gray-400 font-medium">{item.account}</td>

                    <td className={`p-4 font-bold ${item.type === 'income' ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
                      {isEditing ? (
                        <input
                          type="number"
                          className="bg-transparent border-b border-orange-500 outline-none w-24"
                          value={editing.updatedData.amount}
                          onChange={(e) => setEditing({...editing, updatedData: {...editing.updatedData, amount: Number(e.target.value)}})}
                        />
                      ) : (
                        `${item.type === 'income' ? '+' : '-'}${formatCurrency(item.amount)}`
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${item.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {item.type}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500 whitespace-nowrap text-xs font-medium">{item.date}</td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        {isEditing ? (
                          <>
                            <button onClick={() => { editTransaction(item.id, editing.updatedData); setEditing({ editingId: '', isEditing: false, updatedData: {} }); }} className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg">
                              <Save size={16} />
                            </button>
                            <button onClick={() => deleteTransaction(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg">
                              <Trash size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setEditing({ isEditing: true, editingId: item.id, updatedData: { ...item } })}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};