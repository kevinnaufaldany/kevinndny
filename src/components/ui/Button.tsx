import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  showArrow?: boolean;
  href?: string;
  asAnchor?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  showArrow = true,
  className,
  href,
  asAnchor = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 group select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-black shadow-subtle hover:shadow-card hover:scale-[1.02]",
    outline: "bg-transparent border border-brand-border text-brand-dark hover:border-brand-primary hover:bg-brand-surface",
    ghost: "bg-transparent text-brand-secondary hover:text-brand-primary hover:bg-brand-surface",
    white: "bg-white text-brand-dark hover:bg-brand-surface border border-zinc-200 shadow-subtle hover:shadow-card hover:scale-[1.02]"
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (asAnchor && href) {
    return (
      <a href={href} className={cn(baseStyles, variants[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {content}
    </button>
  );
};
