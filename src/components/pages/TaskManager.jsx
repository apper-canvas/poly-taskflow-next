import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { categoryService, taskService } from "@/services";
import FilterBar from "@/components/molecules/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/molecules/TaskForm";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";
const TaskManager = () => {
  // State Management
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // UI State
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  
// Filter State
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState(null);
  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Quick add event listener
  useEffect(() => {
    const handleQuickAdd = () => {
      setShowTaskForm(true);
      setEditingTask(null);
    };

    window.addEventListener('quickAdd', handleQuickAdd);
    return () => window.removeEventListener('quickAdd', handleQuickAdd);
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [tasksResult, categoriesResult] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksResult);
      setCategories(categoriesResult);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };
// Filtered tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Apply category filter
    if (activeCategory) {
      result = result.filter(task => task.category === activeCategory);
    }

    // Apply status filter
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeFilter) {
      case 'today':
        result = result.filter(task => task.dueDate === today);
        break;
      case 'upcoming':
        result = result.filter(task => task.dueDate && task.dueDate > today);
        break;
      case 'overdue':
        result = result.filter(task => 
          task.dueDate && task.dueDate < today && !task.completed
        );
        break;
      case 'completed':
        result = result.filter(task => task.completed);
        break;
      case 'pending':
        result = result.filter(task => !task.completed);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Sort by priority and due date
    return result.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Sort by priority
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
return 0;
    });
  }, [tasks, activeCategory, activeFilter]);

  // Task counts for filter badges
  const taskCounts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      all: tasks.length,
      today: tasks.filter(task => task.dueDate === today).length,
      upcoming: tasks.filter(task => task.dueDate && task.dueDate > today).length,
      overdue: tasks.filter(task => 
        task.dueDate && task.dueDate < today && !task.completed
      ).length,
      completed: tasks.filter(task => task.completed).length
    };
  }, [tasks]);

  // Progress calculation
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  }, [tasks]);

  // Task CRUD Operations
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowTaskForm(false);
      setEditingTask(null);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ));
      setShowTaskForm(false);
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      
      if (updatedTask.completed) {
        toast.success('Task completed! 🎉');
      } else {
        toast.info('Task marked as pending');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleBulkDelete = async (taskIds) => {
    if (!window.confirm(`Are you sure you want to delete ${taskIds.length} task${taskIds.length !== 1 ? 's' : ''}?`)) {
      return;
    }

    try {
      await taskService.bulkDelete(taskIds);
      setTasks(prev => prev.filter(task => !taskIds.includes(task.id)));
      setSelectedTasks([]);
      toast.success(`${taskIds.length} task${taskIds.length !== 1 ? 's' : ''} deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete tasks');
    }
  };

  // UI Event Handlers
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    const allTaskIds = filteredTasks.map(task => task.id);
    const allSelected = selectedTasks.length === allTaskIds.length;
    
    setSelectedTasks(allSelected ? [] : allTaskIds);
};

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Tasks</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadInitialData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-full overflow-hidden">
        {/* Sidebar with Progress & Filters */}
        <aside className="lg:w-80 bg-white border-r border-gray-200 overflow-y-auto">
          {/* Progress Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="text-center">
              <ProgressRing progress={progress} size={100} strokeWidth={6} />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 font-display">Daily Progress</h3>
              <p className="text-sm text-gray-600">
                {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
              </p>
            </div>
          </div>
          {/* Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories}
            taskCounts={taskCounts} />
        </aside>
        {/* Task List */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              selectedTasks={selectedTasks}
              onSelectTask={handleSelectTask}
              onSelectAll={handleSelectAll}
              onBulkDelete={handleBulkDelete}
              loading={loading} />
          </div>
        </main>
      </div>
      {/* Task Form Modal */}
      <AnimatePresence>
        {showTaskForm && <>
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCloseForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <TaskForm
              task={editingTask}
              categories={categories}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCloseForm}
              loading={loading} />
          </div>
        </>}
      </AnimatePresence>
    </div>
  );
};

export default TaskManager;