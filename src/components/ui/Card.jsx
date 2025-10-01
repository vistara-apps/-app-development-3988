import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses = 'bg-surface border border-border rounded-xl shadow-card overflow-hidden';
  
  const cardContent = (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  );
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return cardContent;
};