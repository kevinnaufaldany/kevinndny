import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  asAnchor?: boolean;
  asDiv?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  textClassName?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ 
  text = "Button", 
  className, 
  asAnchor, 
  asDiv, 
  href, 
  target, 
  rel, 
  textClassName = "text-sm font-semibold",
  ...props 
}, ref) => {
  const content = (
    <>
      <span className={cn(
        "inline-block translate-x-1 transition-all duration-300 group-hover/ihb:translate-x-12 group-hover/ihb:opacity-0 text-brand-dark",
        textClassName
      )}>
        {text}
      </span>
      <div className={cn(
        "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1.5 text-white opacity-0 transition-all duration-300 group-hover/ihb:-translate-x-1 group-hover/ihb:opacity-100",
        textClassName
      )}>
        <span>{text}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </div>
      <div className="absolute left-[15%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-brand-dark transition-all duration-300 group-hover/ihb:left-[0%] group-hover/ihb:top-[0%] group-hover/ihb:h-full group-hover/ihb:w-full group-hover/ihb:scale-[1.8] group-hover/ihb:bg-brand-dark"></div>
    </>
  );

  const baseClasses = cn(
    "group/ihb relative inline-flex items-center justify-center w-36 p-3 cursor-pointer overflow-hidden rounded-full border border-brand-border bg-white text-center shadow-subtle hover:shadow-card transition-all duration-300",
    className
  );

  if (asDiv) {
    return (
      <div className={baseClasses}>
        {content}
      </div>
    );
  }

  if (asAnchor && href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? (rel || "noreferrer noopener") : rel}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };