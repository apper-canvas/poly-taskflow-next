import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  value, 
  onChange, 
  onClear,
  placeholder = "Search tasks...",
  className = '' 
}) => {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  const handleClear = () => {
    setLocalValue('');
    onClear();
  };

  return (
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className={`relative ${className}`}
    >
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-2.5 border-2 rounded-lg transition-all duration-150
            ${focused 
              ? 'border-primary focus:border-primary focus:ring-primary/20' 
              : 'border-gray-200 hover:border-gray-300'
            }
            focus:outline-none focus:ring-2 bg-white
          `}
        />

        {localValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" size={16} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;