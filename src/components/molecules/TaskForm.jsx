import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ApperIcon from '@/components/ApperIcon';

const TaskForm = ({ 
  task = null, 
  categories = [], 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'Medium',
    dueDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        category: task.category || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate || '',
        notes: task.notes || ''
      });
    }
  }, [task]);

  const priorityOptions = [
    { value: 'High', label: '🔴 High Priority' },
    { value: 'Medium', label: '🟡 Medium Priority' },
    { value: 'Low', label: '🟢 Low Priority' }
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat.name,
    label: cat.name
  }));

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error('Failed to save task');
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-md w-full mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 font-display">
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="Enter task title"
          error={errors.title}
          required
          icon="Type"
        />

        <Select
          label="Category"
          value={formData.category}
          onChange={handleChange('category')}
          options={categoryOptions}
          placeholder="Select category"
          error={errors.category}
          required
        />

        <Select
          label="Priority"
          value={formData.priority}
          onChange={handleChange('priority')}
          options={priorityOptions}
          placeholder="Select priority"
        />

        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={handleChange('dueDate')}
          error={errors.dueDate}
          icon="Calendar"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={handleChange('notes')}
            placeholder="Add any additional notes..."
            rows={3}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-150"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
            icon={task ? "Save" : "Plus"}
          >
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;