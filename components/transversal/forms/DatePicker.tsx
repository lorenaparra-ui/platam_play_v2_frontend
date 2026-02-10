import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { Input, InputProps } from "./Input"
import { Calendar } from "lucide-react"

const DatePicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          type="date"
          className={cn(
            "pl-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer", 
            className
          )}
          ref={ref}
          {...props}
        />
        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }