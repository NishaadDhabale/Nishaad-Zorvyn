import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, FileText, Users, LogOut, Sun, Moon
} from 'lucide-react';
import { useThemeStore } from '../../hooks/useDarkMode';
import { useNavigationStore } from '../../hooks/useNavigationStore';
import { useRoleStore } from '../../hooks/useRoleStore';
import { useShallow } from 'zustand/shallow';


export const Sidebar = () => {
  const { isDarkMode, toggleTheme }= useThemeStore(useShallow((state) => ({ isDarkMode: state.isDarkMode, toggleTheme: state.toggleTheme })));
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  const role = useRoleStore((state) => state.role);
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-20 hidden md:flex flex-col items-center py-6 bg-white dark:bg-[#1A1A1E] border-r border-gray-100 dark:border-gray-800 z-10"
    >
      <div className="w-10 h-10 bg-[#FF5722] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-8 shadow-lg shadow-orange-500/30">
        {role.charAt(0).toUpperCase()}
      </div>

      <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mb-8 transition-colors text-gray-500 dark:text-gray-400">
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <nav className="flex flex-col gap-6 flex-1 text-gray-400 dark:text-gray-500">
        <span onClick={()=>{setActiveTab('Overview')}}><NavItem  icon={<Users size={22} />} /></span>
        <span onClick={()=>{setActiveTab('Transactions')}}><NavItem icon={<Calendar size={22} />} /></span>
        <span onClick={()=>{setActiveTab('Insights')}}><NavItem  icon={<FileText size={22} />} /></span>

      </nav>

      <div className="flex flex-col gap-6 text-gray-400 dark:text-gray-500 mt-auto">

        <NavItem icon={<LogOut size={22} />} />
      </div>
    </motion.aside>
  );
};

const NavItem = ({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) => (
  <div className={`p-2 rounded-xl cursor-pointer transition-all ${active ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
    {icon}
  </div>
);