import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { inputVariants } from "./Input"
import { ChevronDown } from "lucide-react"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
    variant?: "default" | "error" | "success"
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            inputVariants({ variant }),
            "appearance-none pr-10 cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

