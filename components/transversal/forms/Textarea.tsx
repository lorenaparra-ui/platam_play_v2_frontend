import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { inputVariants } from "./Input" 

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: "default" | "error" | "success"
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    // Reutilizamos las clases de input pero ajustamos la altura
    return (
      <textarea
        className={cn(
          inputVariants({ variant }),
          "flex min-h-[80px] w-full py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

