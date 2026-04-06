import { useState } from 'react';
import {
  Search,
  Bell,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigationStore } from '../../hooks/useNavigationStore';
import { useShallow } from 'zustand/shallow';
import { useRoleStore } from '../../hooks/useRoleStore';

type TabType = 'Overview' | 'Transactions' | 'Insights';
export const TopNav = () => {
  const { selectedTab, setSelectedTab } = useNavigationStore(
    useShallow((state) => ({
      selectedTab: state.activeTab,
      setSelectedTab: state.setActiveTab,
    })),
  );
  const { role, setRole } = useRoleStore(
    useShallow((state) => ({
      role: state.role,
      setRole: state.setRole,
    })),
  );
  const [isOpen, setIsOpen] = useState(false);
  const roles = ['Admin', 'Viewer'];
  return (
    <header className="h-20 px-8 flex items-center justify-between bg-transparent">
      <div className="flex space-x-2 bg-white dark:bg-[#1A1A1E] p-1.5 rounded-full shadow-sm">
        {['Overview', 'Transactions', 'Insights'].map((item) => {
          const isActive = selectedTab === item;

          return (
            <button
              key={item}
              onClick={() => setSelectedTab(item as TabType)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium outline-none transition-colors duration-300 ${
                isActive
                  ? 'text-white dark:text-gray-900'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {/* The Label: Needs z-10 to stay above the sliding pill */}
              <span className="relative z-10">{item}</span>

              {/* The Sliding Pill */}
              {isActive && (
                <motion.div
                  layoutId="pill-bg" // This ID links all the tabs together for the slide effect
                  className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-white dark:bg-[#1A1A1E] p-2.5 rounded-full shadow-sm text-gray-500">
          <Search
            size={20}
            className="hover:text-gray-900 cursor-pointer transition-colors"
          />
          <Bell
            size={20}
            className="hover:text-gray-900 cursor-pointer transition-colors"
          />
          <AlertCircle
            size={20}
            className="hover:text-gray-900 cursor-pointer transition-colors"
          />
        </div>
        <div className="relative">
          {/* --- Trigger Pill --- */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 bg-white dark:bg-[#1A1A1E] p-1.5 pr-4 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <img
              src="https://i.pravatar.cc/150?u=sajibur"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                Someone
              </p>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">
                {role}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-gray-400 ml-2" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1A1A1E] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden z-20"
                >
                  <div className="p-2">
                    <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Select Role
                    </p>

                    {roles.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRole(r);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                          role === r
                            ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
