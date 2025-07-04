import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-slate-400 selection:bg-primary selection:text-primary-foreground",
        "flex field-sizing-content min-h-16 w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-base text-slate-100 shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-[3px]",
        "hover:bg-slate-800/70 hover:border-slate-600/50",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
