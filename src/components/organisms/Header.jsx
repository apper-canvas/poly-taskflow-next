import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';

const Header = ({ 
  onQuickAdd, 
  onSearch, 
  searchValue = '',
  onClearSearch 
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 z-40">
      <div className="flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
          >
            <ApperIcon name="CheckSquare" size={20} className="text-white" />
          </motion.div>
          
          <h1 className="text-xl font-bold text-gray-900 font-display">
            TaskFlow
          </h1>
        </div>

        {/* Desktop Search & Actions */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md ml-8">
          <SearchBar
            value={searchValue}
            onChange={onSearch}
            onClear={onClearSearch}
            placeholder="Search tasks..."
            className="flex-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ApperIcon name="Search" size={20} />
          </motion.button>

          {/* Quick Add Button */}
          <Button
            variant="primary"
            size="md"
            icon="Plus"
            onClick={onQuickAdd}
            className="shadow-sm"
          >
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pt-3 border-t border-gray-100"
          >
            <SearchBar
              value={searchValue}
              onChange={onSearch}
              onClear={() => {
                onClearSearch();
                setShowSearch(false);
              }}
              placeholder="Search tasks..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;