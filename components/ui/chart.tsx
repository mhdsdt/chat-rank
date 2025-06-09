"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  return (
    <div
      className={cn("recharts-wrapper", className)}
      style={
        {
          "--color-background": "hsl(var(--background))",
          "--color-foreground": "hsl(var(--foreground))",
          ...Object.fromEntries(Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color])),
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps extends React.ComponentPropsWithoutRef<typeof Tooltip> {
  className?: string
}

export function ChartTooltip({ className, children, content, ...props }: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={cn("min-w-[60px] bg-background border-border text-foreground", className)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      [key: string]: any
    }
  }>
  label?: string
  labelFormatter?: (label: string) => React.ReactNode
  formatter?: (value: number, name: string, props: any) => [string, string]
  className?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  formatter,
  className,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)}>
      <div className="grid gap-2">
        <div className="text-sm font-medium">{labelFormatter ? labelFormatter(label as string) : label}</div>
        <div className="grid gap-1">
          {payload.map((item, index) => {
            const formattedValue = formatter
              ? formatter(item.value, item.name, item)
              : [item.value.toString(), item.name]

            return (
              <div key={`item-${index}`} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  <span>{formattedValue[1]}</span>
                </div>
                <div className="text-sm font-medium">{formattedValue[0]}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
