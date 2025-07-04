import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-400 selection:bg-primary selection:text-primary-foreground",
        "flex h-9 w-full min-w-0 rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-base text-slate-100 shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px]",
        "hover:bg-slate-800/70 hover:border-slate-600/50",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
