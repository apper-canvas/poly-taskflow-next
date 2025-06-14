import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  activeCategory, 
  onCategoryChange, 
  categories,
  taskCounts 
}) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: 'List' },
    { id: 'today', label: 'Today', icon: 'Calendar' },
    { id: 'upcoming', label: 'Upcoming', icon: 'Clock' },
    { id: 'overdue', label: 'Overdue', icon: 'AlertCircle' },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const categoryColors = {
    Work: '#6366F1',
    Personal: '#8B5CF6',
    Shopping: '#EC4899',
    Health: '#10B981'
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-full overflow-x-auto">
        {/* Filter Chips */}
        <div className="flex gap-2 mb-4 min-w-max">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange(filter.id)}
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${activeFilter === filter.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <ApperIcon name={filter.icon} size={16} />
              {filter.label}
              {taskCounts[filter.id] > 0 && (
                <span className={`
                  px-1.5 py-0.5 rounded-full text-xs font-medium
                  ${activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-200'}
                `}>
                  {taskCounts[filter.id]}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 min-w-max">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(null)}
            className={`
              inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${!activeCategory
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <ApperIcon name="Grid3X3" size={16} />
            All Categories
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(category.name)}
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${activeCategory === category.name
                  ? 'text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
              style={{
                backgroundColor: activeCategory === category.name 
                  ? categoryColors[category.name] || '#6B7280'
                  : undefined
              }}
            >
              <ApperIcon name={category.icon} size={16} />
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;