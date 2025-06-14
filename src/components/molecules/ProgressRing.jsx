import { motion } from 'framer-motion';

const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  className = '' 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${progress * circumference / 100} ${circumference}`;

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="progress-ring transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress * circumference / 100) }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Progress Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 font-display"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  );
};

export default ProgressRing;