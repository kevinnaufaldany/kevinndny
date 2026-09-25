import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  asAnchor?: boolean;
  href?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, asAnchor, href, ...props }, ref) => {
  const content = (
    <>
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-sm font-semibold text-brand-dark">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 text-sm font-semibold">
        <span>{text}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-brand-dark transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-brand-dark"></div>
    </>
  );

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-center w-36 cursor-pointer overflow-hidden rounded-full border border-brand-border bg-white p-3 text-center shadow-subtle hover:shadow-card transition-all duration-300",
          className,
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center w-36 cursor-pointer overflow-hidden rounded-full border border-brand-border bg-white p-3 text-center shadow-subtle hover:shadow-card transition-all duration-300",
        className,
      )}
      {...props}
    >
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };