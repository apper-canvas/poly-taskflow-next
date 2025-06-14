import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskList = ({ 
  tasks = [], 
  onToggleComplete, 
  onEdit, 
  onDelete,
  selectedTasks = [],
  onSelectTask,
  onSelectAll,
  onBulkDelete,
  loading = false 
}) => {
  const allSelected = tasks.length > 0 && selectedTasks.length === tasks.length;
  const someSelected = selectedTasks.length > 0;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-6"
        >
          <ApperIcon name="CheckSquare" size={64} className="text-gray-300 mx-auto" />
        </motion.div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">
          No tasks found
        </h3>
        <p className="text-gray-500 mb-6">
          Get started by creating your first task or adjust your filters
        </p>
        
        <Button
          variant="primary"
          icon="Plus"
          onClick={() => window.dispatchEvent(new CustomEvent('quickAdd'))}
        >
          Create First Task
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {someSelected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-primary">
                {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <Button
              variant="danger"
              size="sm"
              icon="Trash2"
              onClick={() => onBulkDelete(selectedTasks)}
            >
              Delete Selected
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div className="space-y-3 group">
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <TaskCard
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                isSelected={selectedTasks.includes(task.id)}
                onSelect={onSelectTask}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;