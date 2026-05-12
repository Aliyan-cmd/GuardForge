// src/components/Card.tsx

import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`glass p-6 rounded-xl shadow-lg ${className}`}>
      {title && <h3 className="text-lg font-medium mb-4 text-primary">{title}</h3>}
      {children}
    </div>
  );
};
