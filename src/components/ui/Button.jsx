import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-150 ease-in-out flex items-center justify-center gap-2 touch-manipulation';
  
  const variants = {
    primary: 'bg-primary hover:bg-primaryHover text-white disabled:opacity-50',
    secondary: 'bg-surface hover:bg-surfaceElevated text-text border border-border disabled:opacity-50',
    ghost: 'hover:bg-surface text-textMuted hover:text-text disabled:opacity-50',
  };
  
  const sizes = {
    sm: 'py-2 px-4 text-sm min-h-[40px]',
    md: 'py-3 px-6 text-sm min-h-[44px]',
    lg: 'py-4 px-8 text-base min-h-[48px]',
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
};