import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Component Imports (Adjust paths as necessary)
import { TotalBalance } from './TotalBalance';
import { CardsSection } from './CardsSection';
import { QuickStats } from './QuickStats';
import { IncomeChart } from './IncomeChart';
import { RecentActivities } from './RecentActivities';

// --- Types ---
type ComponentName =
  | 'TotalBalance'
  | 'CardsSection'
  | 'QuickStats'
  | 'IncomeChart'
  | 'RecentActivities';

type Item = {
  id: string;
  name: ComponentName;
  className: string;
};

// --- Framer Motion Variants ---
const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// --- Component Factory ---
const ComponentFactory = ({ name }: { name: ComponentName }) => {
  const components = {
    TotalBalance: <TotalBalance />,
    CardsSection: <CardsSection />,
    QuickStats: <QuickStats />,
    IncomeChart: <IncomeChart />,
    RecentActivities: <RecentActivities isFullPage={false} limit={5}/>,
  };
  return components[name] || null;
};

function SortableItem({
  id,
  item,
  isEditing,
}: {
  id: string;
  item: Item;
  isEditing: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    touchAction: 'none' as const,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      variants={itemVariants}
      layout
      // Only spread listeners if we are editing
      {...(isEditing ? { ...attributes, ...listeners } : {})}
      className={`${item.className} ${
        isEditing ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      }`}
    >
      <motion.div
        whileHover={isEditing ? { scale: 1.02 } : {}}
        whileTap={isEditing ? { scale: 0.98 } : {}}
        className={`h-full relative transition-all duration-500 ${
          isEditing
            ? 'ring-2 ring-orange-500/40 rounded-[2rem] shadow-xl p-1 bg-orange-50/10'
            : ''
        }`}
      >
        {/* Visual Indicator for Edit Mode */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 bg-orange-500 text-white p-1 rounded-full shadow-md z-20"
            ></motion.div>
          )}
        </AnimatePresence>

        <ComponentFactory name={item.name} />
      </motion.div>
    </motion.div>
  );
}

export  function Overview() {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'TotalBalance', className: 'lg:col-span-4' },
    { id: '3', name: 'QuickStats', className: 'lg:col-span-4' },
    { id: '5', name: 'RecentActivities', className: 'lg:col-span-8' },
    { id: '2', name: 'CardsSection', className: 'lg:col-span-4' },
    { id: '4', name: 'IncomeChart', className: 'lg:col-span-4' },

  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-1 max-w-7xl mx-auto min-h-screen bg-gray-50 dark:bg-[#0F0F12]"
    >
      {/* Header with Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Good morning, Sajibur
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Customize your workspace by dragging cards.
          </p>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all ${
            isEditing
              ? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
              : 'bg-white dark:bg-[#1A1A1E] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-800'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Layout'}
        </motion.button>


      </div>

      <DndContext
        sensors={isEditing ? sensors : []}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                item={item}
                isEditing={isEditing}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </motion.div>
  );
}
