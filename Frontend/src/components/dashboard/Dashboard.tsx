import { useNavigationStore } from '../../hooks/useNavigationStore';
import { Insights } from './Insights';
import { Overview } from './Overview';
import { motion, AnimatePresence } from 'framer-motion';
import { Transactions } from './Transactions';

const Dashboard = () => {
  const activeTab = useNavigationStore((state) => state.activeTab);

  // Map tabs to components
  const renderView = () => {
    switch (activeTab) {
      case 'Overview': return <Overview />;
      case 'Insights': return <Insights/>;
      case 'Transactions': return <Transactions/>;
      default: return <Overview />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Dashboard;