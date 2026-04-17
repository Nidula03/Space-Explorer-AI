import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        p-6 bg-surface-container rounded-xl border border-outline-variant/10
        ${hover ? 'hover:bg-surface-container-high transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
