import { motion } from 'framer-motion';
import { RecentActivities } from './RecentActivities';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export function Transactions() {
  return (
    <div>
              
      <RecentActivities isFullPage={true} />
    </div>
  );
}
