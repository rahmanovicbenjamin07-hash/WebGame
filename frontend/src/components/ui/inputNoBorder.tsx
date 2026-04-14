import * as React from "react"
import { cn } from "@/lib/utils"

function InputNoBorder({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground shadow-[0_0_10px_0_rgba(0,0,0,0.2)] py-2 placeholder:leading-[150%] px-4 placeholder:text-dark placeholder:text-[12px] placeholder:font-medium placeholder:font-poppins  selection:text-primary-foreground h-10 w-full min-w-0 rounded-full border-2 border-transparent bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { InputNoBorder }
