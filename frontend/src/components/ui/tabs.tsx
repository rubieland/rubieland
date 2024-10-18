import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "tw-inline-flex tw-h-9 tw-items-center tw-justify-center tw-rounded-lg tw-bg-neutral-100 tw-p-1 tw-text-neutral-500 dark:tw-bg-neutral-800 dark:tw-text-neutral-400",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-all focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-neutral-950 focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-white data-[state=active]:tw-text-neutral-950 data-[state=active]:tw-shadow dark:tw-ring-offset-neutral-950 dark:focus-visible:tw-ring-neutral-300 dark:data-[state=active]:tw-bg-neutral-950 dark:data-[state=active]:tw-text-neutral-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "tw-mt-2 tw-ring-offset-white focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-neutral-950 focus-visible:tw-ring-offset-2 dark:tw-ring-offset-neutral-950 dark:focus-visible:tw-ring-neutral-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
