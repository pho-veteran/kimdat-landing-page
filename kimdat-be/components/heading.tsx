import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeadingProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}