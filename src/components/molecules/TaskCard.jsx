import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import { format, isPast, isToday } from 'date-fns';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isSelected,
  onSelect 
}) => {
  const priorityColors = {
    High: 'text-error',
    Medium: 'text-warning',
    Low: 'text-gray-400'
  };

  const categoryColors = {
    Work: '#6366F1',
    Personal: '#8B5CF6',
    Shopping: '#EC4899',
    Health: '#10B981'
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200
        ${isSelected ? 'ring-2 ring-primary/50 border-primary/50' : ''}
        ${task.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Selection Checkbox */}
        <Checkbox
          checked={isSelected}
          onChange={() => onSelect(task.id)}
          className="mt-1"
        />

        {/* Task Checkbox */}
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1"
        />

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`
              font-medium text-gray-900 break-words
              ${task.completed ? 'line-through text-gray-500' : ''}
            `}>
              {task.title}
            </h3>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-primary transition-colors"
              >
                <ApperIcon name="Edit2" size={16} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-error transition-colors"
              >
                <ApperIcon name="Trash2" size={16} />
              </motion.button>
            </div>
          </div>

          {/* Task Metadata */}
          <div className="flex items-center gap-3 mt-2">
            {/* Category Badge */}
            <span 
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: categoryColors[task.category] || '#6B7280' }}
            >
              <ApperIcon 
                name={
                  task.category === 'Work' ? 'Briefcase' :
                  task.category === 'Personal' ? 'User' :
                  task.category === 'Shopping' ? 'ShoppingCart' :
                  task.category === 'Health' ? 'Heart' : 'Tag'
                } 
                size={12} 
              />
              {task.category}
            </span>

            {/* Priority Indicator */}
            <div className="flex items-center gap-1">
              <motion.div
                animate={task.priority === 'High' && isOverdue ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-2 h-2 rounded-full ${
                  task.priority === 'High' ? 'bg-error' :
                  task.priority === 'Medium' ? 'bg-warning' :
                  'bg-gray-300'
                }`}
              />
              <span className={`text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={`
                flex items-center gap-1 text-xs
                ${isOverdue ? 'text-error font-medium' : 
                  isDueToday ? 'text-warning font-medium' : 
                  'text-gray-500'}
              `}>
                <ApperIcon name="Calendar" size={12} />
                {isOverdue && <span className="text-error">Overdue:</span>}
                {isDueToday && <span className="text-warning">Due today:</span>}
                {format(new Date(task.dueDate), 'MMM d')}
              </div>
            )}
          </div>

          {/* Notes Preview */}
          {task.notes && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {task.notes}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;