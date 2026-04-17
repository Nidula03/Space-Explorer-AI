import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary-container text-surface-lowest hover:bg-primary transition-colors',
    secondary: 'bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors',
    outline: 'border border-outline-variant text-on-surface hover:bg-surface-container/50 transition-colors',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`font-bold rounded-xl transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
