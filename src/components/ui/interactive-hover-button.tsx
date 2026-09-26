import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  direction?: 'left' | 'right';
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
  direction = "right",
  className, 
  asAnchor, 
  asDiv, 
  href, 
  target, 
  rel, 
  textClassName = "text-sm font-semibold",
  ...props 
}, ref) => {
  const isLeft = direction === "left";

  const content = (
    <>
      <span className={cn(
        "inline-block transition-all duration-300 text-brand-dark",
        isLeft 
          ? "-translate-x-1 group-hover/ihb:-translate-x-12 group-hover/ihb:opacity-0" 
          : "translate-x-1 group-hover/ihb:translate-x-12 group-hover/ihb:opacity-0",
        textClassName
      )}>
        {text}
      </span>
      <div className={cn(
        "absolute top-0 z-10 flex h-full w-full items-center justify-center gap-1.5 text-white opacity-0 transition-all duration-300",
        isLeft 
          ? "-translate-x-12 group-hover/ihb:translate-x-0 group-hover/ihb:opacity-100" 
          : "translate-x-12 group-hover/ihb:-translate-x-1 group-hover/ihb:opacity-100",
        textClassName
      )}>
        {isLeft && <ArrowLeft className="w-3.5 h-3.5 shrink-0" />}
        <span>{text}</span>
        {!isLeft && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
      </div>
      <div 
        className={cn(
          "absolute top-[40%] h-2 w-2 scale-[1] rounded-full bg-brand-dark transition-all duration-300 group-hover/ihb:top-[0%] group-hover/ihb:h-full group-hover/ihb:w-full group-hover/ihb:scale-[1.8] group-hover/ihb:bg-brand-dark",
          isLeft ? "right-[15%] group-hover/ihb:right-[0%]" : "left-[15%] group-hover/ihb:left-[0%]"
        )}
      />
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