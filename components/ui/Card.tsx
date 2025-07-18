'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div 
    className={cn("bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700", className)}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("p-6 border-b border-gray-200 dark:border-gray-700", className)} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => (
  <h3 className={cn("text-lg font-semibold text-gray-900 dark:text-white", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className, ...props }) => (
  <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props}>
    {children}
  </p>
);