import { motion } from 'framer-motion';

const Checkbox = ({ 
  checked, 
  onChange, 
  label, 
  disabled = false, 
  className = '',
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <motion.div
        className="relative"
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        <motion.div
          className={`
            ${sizes[size]} border-2 rounded transition-all duration-150
            ${checked 
              ? 'bg-success border-success' 
              : 'bg-white border-gray-300 hover:border-gray-400'
            }
          `}
          animate={{
            backgroundColor: checked ? '#10B981' : '#FFFFFF',
            borderColor: checked ? '#10B981' : '#D1D5DB'
          }}
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-full h-full text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>
      
      {label && (
        <span className="ml-2 text-sm font-medium text-gray-900">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;