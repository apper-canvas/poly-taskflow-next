import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  const hasValue = value && value.length > 0;

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Floating Label */}
      {label && (
        <motion.label
          animate={{
            top: focused || hasValue || isOpen ? '0.5rem' : '0.75rem',
            fontSize: focused || hasValue || isOpen ? '0.75rem' : '1rem',
            color: focused || isOpen ? '#6366F1' : error ? '#EF4444' : '#6B7280'
          }}
          transition={{ duration: 0.15 }}
          className="absolute left-3 pointer-events-none font-medium z-10"
          style={{ transformOrigin: 'left top' }}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </motion.label>
      )}

      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        className={`
          w-full px-3 py-3 border-2 rounded-lg transition-all duration-150 text-left
          ${label ? 'pt-6 pb-2' : ''}
          ${error 
            ? 'border-error focus:border-error focus:ring-error/20' 
            : focused || isOpen
              ? 'border-primary focus:border-primary focus:ring-primary/20' 
              : 'border-gray-200 hover:border-gray-300'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          focus:outline-none focus:ring-2
        `}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ApperIcon 
            name="ChevronDown" 
            size={18} 
            className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-150
                  ${value === option.value ? 'bg-primary/10 text-primary' : 'text-gray-900'}
                  first:rounded-t-lg last:rounded-b-lg
                `}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-error flex items-center gap-1"
        >
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </motion.p>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Select;