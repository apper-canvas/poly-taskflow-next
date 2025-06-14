import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      {/* Floating Label */}
      {label && (
        <motion.label
          animate={{
            top: focused || hasValue ? '0.5rem' : '0.75rem',
            fontSize: focused || hasValue ? '0.75rem' : '1rem',
            color: focused ? '#6366F1' : error ? '#EF4444' : '#6B7280'
          }}
          transition={{ duration: 0.15 }}
          className="absolute left-3 pointer-events-none font-medium"
          style={{ transformOrigin: 'left top' }}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </motion.label>
      )}

      {/* Input Field */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder={focused ? placeholder : ''}
          className={`
            w-full px-3 py-3 border-2 rounded-lg transition-all duration-150
            ${icon ? 'pl-10' : ''}
            ${label ? 'pt-6 pb-2' : ''}
            ${error 
              ? 'border-error focus:border-error focus:ring-error/20' 
              : focused 
                ? 'border-primary focus:border-primary focus:ring-primary/20' 
                : 'border-gray-200 hover:border-gray-300'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-2
          `}
          {...props}
        />
      </div>

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
    </div>
  );
};

export default Input;